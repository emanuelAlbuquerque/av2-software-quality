import { Request, Response } from "express"
import { ExceptionUseCase } from "../../../domain/usecase/exception"

class ExceptionController {
    private readonly exceptionUseCase: ExceptionUseCase

    constructor() {
        this.exceptionUseCase = new ExceptionUseCase()
    }

    public execute = async (req: Request, res: Response): Promise<void> => {
        const response = await this.exceptionUseCase.execute()

        if(response.error) {
            res.status(response.error.statusCode).json(response)

            return
        }

        res.status(201).json(response)
    }
}

export {
    ExceptionController
}