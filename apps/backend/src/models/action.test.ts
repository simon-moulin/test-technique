import { ActionQueue, Action } from './action';

describe('ActionQueue', () => {
    let actionQueue: ActionQueue;
    const actionA: Action = { type: 'Generate PDF', createdAt: new Date() };
    const actionB: Action = { type: 'Send E-mail', createdAt: new Date() };

    beforeEach(() => {
        actionQueue = new ActionQueue();
    });

    test('should create an empty queue', () => {
        expect(actionQueue.getQueue()).toEqual([]);
    });

    test('should add an action to the queue', () => {
        actionQueue.add(actionA);
        expect(actionQueue.getQueue()).toEqual([actionA]);
    });

    test('should execute an action from the queue', () => {
        actionQueue.add(actionA);
        actionQueue.add(actionB);
        const executedAction = actionQueue.execute();
        expect(executedAction).toEqual(actionA);
        expect(actionQueue.getQueue()).toEqual([actionB]);
    });

    test('should return null if getting next action from an empty queue', () => {
        expect(actionQueue.getNext()).toBeNull();
    });

    test('should get the next action without removing it from the queue', () => {
        actionQueue.add(actionA);
        actionQueue.add(actionB);
        expect(actionQueue.getNext()).toEqual(actionA);
        expect(actionQueue.getQueue()).toEqual([actionA, actionB]);
    });

    test('should set the queue', () => {
        actionQueue.setQueue([actionA, actionB]);
        expect(actionQueue.getQueue()).toEqual([actionA, actionB]);
    });
});
