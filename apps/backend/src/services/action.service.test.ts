import { ActionService } from './action.service';
import { ActionType } from '../models/action';
import { Server } from 'socket.io';
import { jest } from '@jest/globals';

describe('ActionService', () => {
    let actionService: ActionService;
    let mockSocketServer: jest.Mocked<Server>;
    const actionType: ActionType = 'Generate PDF';

    beforeEach(() => {
        mockSocketServer = {
            emit: jest.fn(),
        } as unknown as jest.Mocked<Server>;

        actionService = new ActionService();
        actionService.setSocketServer(mockSocketServer);
    });

    test('should add an action', () => {
        actionService.addAction(actionType);

        expect(actionService.getQueue()).toHaveLength(1);
    });

    test('should execute an action and update credits', () => {
        actionService.addAction(actionType);
        actionService.recalculateCredits();

        const initialCredits = actionService.getCredits().find(credit => credit.type === actionType)!.remaining;

        actionService.executeAction();

        const updatedCredits = actionService.getCredits().find(credit => credit.type === actionType)!.remaining;

        expect(actionService.getQueue()).toHaveLength(0);
        expect(updatedCredits).toEqual(initialCredits - 1);
    });

    test('should not execute an action if no credits remaining', () => {
        actionService.addAction(actionType);

        actionService.credits.setCredits([{
            type: actionType,
            remaining: 0,
        }]);

        const initialQueue = [...actionService.getQueue()];
        const initialCredits = [...actionService.getCredits()];

        actionService.executeAction();

        expect(actionService.getQueue()).toEqual(initialQueue);
        expect(actionService.getCredits()).toEqual(initialCredits);

    })
});
