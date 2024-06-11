import { ActionType, MAX_CREDIT } from "../config";

export type Credit = {
    type: ActionType;
    remaining: number;
}

export class Credits {
    private credits: Credit[]

    constructor() {
        this.credits = []
    }

    getCredits(): Credit[] {
        return this.credits
    }

    getCredit(actionType: ActionType): Credit | undefined {
        return this.credits.find(el => el.type == actionType)
    }

    setCredits(newCredits: Credit[]): void {
        this.credits = newCredits
    }

    consumeCredit(actionType: ActionType): void {
        const credit = this.credits.find(el => el.type == actionType)
        if (credit) {
            credit.remaining -= 1;
        }
    }

    resetCredits(): void {
        this.credits = []
        Object.keys(MAX_CREDIT).forEach(type => {
            const maxCredit = MAX_CREDIT[type as ActionType];
            const randomFactor = Math.random() * 0.2 + 0.8;
            this.credits.push({
                type: type as ActionType,
                remaining: Math.round(maxCredit * randomFactor)
            })
        });
    }


}