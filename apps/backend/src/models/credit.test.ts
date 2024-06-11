import { ActionType, MAX_CREDIT } from "../config";
import { Credits, Credit } from "./credit";

describe("Credits Class", () => {
    let credits: Credits;
    const ACTION_TYPE_1: ActionType = 'Generate PDF'
    const ACTION_TYPE_2: ActionType = 'Send E-mail'

    beforeEach(() => {
        credits = new Credits();
    });

    test("should initialize with an empty credits array", () => {
        expect(credits.getCredits()).toEqual([]);
    });

    test("should set new credits", () => {
        const newCredits: Credit[] = [
            { type: ACTION_TYPE_1, remaining: 10 },
            { type: ACTION_TYPE_2, remaining: 5 }
        ];
        credits.setCredits(newCredits);
        expect(credits.getCredits()).toEqual(newCredits);
    });

    test("should get credit by action type", () => {
        const newCredits: Credit[] = [
            { type: ACTION_TYPE_1, remaining: 10 },
            { type: ACTION_TYPE_2, remaining: 5 }
        ];
        credits.setCredits(newCredits);
        expect(credits.getCredit(ACTION_TYPE_1)).toEqual(newCredits[0]);
        expect(credits.getCredit(ACTION_TYPE_2)).toEqual(newCredits[1]);
    });

    test("should consume credit by action type", () => {
        const newCredits: Credit[] = [
            { type: ACTION_TYPE_1, remaining: 10 }
        ];
        credits.setCredits(newCredits);
        credits.consumeCredit(ACTION_TYPE_1);
        expect(credits.getCredit(ACTION_TYPE_1)?.remaining).toBe(9);
    });

    test("should not consume credit if action type is not found", () => {
        const newCredits: Credit[] = [
            { type: ACTION_TYPE_1, remaining: 10 }
        ];
        credits.setCredits(newCredits);
        credits.consumeCredit(ACTION_TYPE_2);
        expect(credits.getCredit(ACTION_TYPE_1)?.remaining).toBe(10);
    });

    test("should reset credits with random factor between 0.8 and 1.0 of MAX_CREDIT", () => {
        credits.resetCredits();
        const updatedCredits = credits.getCredits();
        Object.keys(MAX_CREDIT).forEach(type => {
            const maxCredit = MAX_CREDIT[type as ActionType];
            const credit = updatedCredits.find(el => el.type === type);
            expect(credit).toBeDefined();
            expect(credit!.remaining).toBeGreaterThanOrEqual(Math.round(maxCredit * 0.8));
            expect(credit!.remaining).toBeLessThanOrEqual(maxCredit);
        });
    });
});
