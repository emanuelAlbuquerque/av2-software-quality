import { Router } from 'express'
import { CreateUserController, SingInController } from '../controller/user'

class Routes {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/createUser', new CreateUserController().execute)
    this.router.post('/signIn', new SingInController().execute)
  }

  public getRouter(): Router {
    return this.router
  }
}

export {
  Routes
}