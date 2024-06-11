import { ActionType, ActionTypes } from "../config";

export interface Action {
    type: ActionType;
    createdAt: Date;
}

export class ActionQueue {
    private queue: Action[];

    constructor() {
        this.queue = [];
    }
    
    add(action: Action): void {
        this.queue.push(action);
    }

    execute(): Action | undefined {
        return this.queue.shift();
    }

    getNext(): Action | null {
        return this.queue.length === 0 ? null : this.queue[0]
    }

    getQueue(): Action[] {
        return this.queue;
    }

    setQueue(queue: Action[]) {
        this.queue = queue;
    }
}
export { ActionType };

