import { Router } from 'express'
import { Routes } from '../interfaces/routes.interface'
import { ActionController } from '../controllers/action.controller'
import Container from 'typedi'

export class ActionRoute implements Routes {
    public path = '/action/'
    public router = Router()
    actionController = Container.get(ActionController)

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}types`, this.actionController.getAllTypes)
        this.router.post(`${this.path}`, this.actionController.addAction)
    }
}