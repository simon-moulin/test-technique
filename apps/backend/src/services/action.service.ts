import { Service } from 'typedi';
import { Action, ActionQueue } from '../models/action';
import { Server } from 'socket.io';
import { Credit, Credits } from '../models/credit';
import { ActionType, COMPUTE_CREDIT_TIMER, EXECUTE_ACTION_TIMER } from '../config';

@Service()
export class ActionService {
    public credits: Credits
    private queue: ActionQueue;
    private io: Server;
    private executeTimer: NodeJS.Timeout;
    private recalculateTimer: NodeJS.Timeout;

    constructor() {
        this.queue = new ActionQueue();
        this.credits = new Credits()
    }

    setSocketServer(io: Server): void {
        this.io = io;
        this.initialize();
    }

    async initialize(): Promise<void> {
        this.recalculateCredits()
        this.scheduleExecuteAction();
        this.scheduleRecalculateCredits();
    }

    scheduleExecuteAction(): void {
        this.executeTimer = setTimeout(() => {
            this.executeAction();
            this.scheduleExecuteAction();
        }, EXECUTE_ACTION_TIMER);
    }

    scheduleRecalculateCredits(): void {
        this.recalculateTimer = setTimeout(() => {
            this.recalculateCredits();
            this.scheduleRecalculateCredits();
        }, COMPUTE_CREDIT_TIMER);
    }

    addAction(type: ActionType): boolean {
        const action: Action = {
            type,
            createdAt: new Date(),
        };
        this.queue.add(action);
        this.io.emit('updateQueue', this.queue.getQueue());
        return true;
    }

    getQueue(): Action[] {
        return this.queue.getQueue();
    }

    getCredits(): Credit[] {
        return this.credits.getCredits();
    }

    executeAction(): void {
        const nextAction = this.queue.getNext()

        if (nextAction) {
            let credit = this.credits.getCredit(nextAction.type);
            if (credit && credit.remaining > 0) {
                this.queue.execute();
                this.credits.consumeCredit(nextAction.type)
                this.io.emit('updateQueue', this.queue.getQueue());
                this.io.emit('updateCredits', this.credits.getCredits());
            }
        }
    }

    recalculateCredits(): void {
        this.credits.resetCredits()
        this.io.emit('updateCredits', this.credits.getCredits());
    }
}
