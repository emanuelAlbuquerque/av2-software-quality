import { Router } from 'express'
import { CreateUserController, SingInController } from '../controller/user'
import { ExceptionController } from '../controller/exception'

class Routes {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/createUser', new CreateUserController().execute)
    this.router.post('/signIn', new SingInController().execute)
    this.router.get('/exception', new ExceptionController().execute)
  }

  public getRouter(): Router {
    return this.router
  }
}

export {
  Routes
}