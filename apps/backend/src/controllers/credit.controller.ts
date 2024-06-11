import { Request, Response } from 'express'
import Container, { Service } from 'typedi'
import { ActionService } from '../services/action.service'

@Service()
export class CreditController {
    actionService = Container.get(ActionService)

    public getAllCredits = (req: Request, res: Response) => {
        try {
            const credits = this.actionService.getCredits();
            return res.status(200).json({ credits });
        } catch (error) {
            console.error('Error getting credits:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}