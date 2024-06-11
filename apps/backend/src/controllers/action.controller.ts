import Container, { Inject, Service } from 'typedi';
import { ActionService } from '../services/action.service';
import { ActionTypes } from '../config';
import { Request, Response } from 'express';

@Service()
export class ActionController {
    actionService = Container.get(ActionService)

    public getAllTypes = (req: Request, res: Response) => {
        return res.status(200).json({ ActionTypes })
    }

    public addAction = (req: Request, res: Response) => {
        try {
            const { type } = req.body;
            if (!ActionTypes.includes(type)) {
                return res.status(404).json({message: 'Invalid action type'})
            }
            this.actionService.addAction(type);
            return res.status(200).json({ message: 'Action added successfully' });
        } catch (error) {
            console.error('Error adding action:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}