import { Router } from 'express'
import { Routes } from '../interfaces/routes.interface'
import { CreditController } from '../controllers/credit.controller'
import Container from 'typedi'

export class CreditRoute implements Routes {
    public path = '/credit/'
    public router = Router()
    creditController = Container.get(CreditController);

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}`).get(this.creditController.getAllCredits)
    }
}