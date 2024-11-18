import { Request, Response } from "express"
import { CreateUserUseCaseDTOInput, SingInUseCaseDTOInput } from "../../../domain/usecase/dto/user"
import { CreateUserUseCase, SingInUseCase } from "../../../domain/usecase/user"
import { GeneralDateLib } from "../../secondary/internal/libs/date"
import { GeneralUUIDLib } from "../../secondary/internal/libs/uuid"
import { CreateUserUseCaseRepository, SingInUseCaseRepository } from "../../secondary/internal/repository/user"
import { CreateUserUseCaseValidator, SingInUseCaseValidator } from "../../secondary/internal/validator/user"
import { InternalErrorEntity } from "../../../domain/usecase/dto/error"

class CreateUserController {
    private readonly createUserUseCase: CreateUserUseCase
    private readonly repository: CreateUserUseCaseRepository
    private readonly validator: CreateUserUseCaseValidator
    private readonly generalUUID: GeneralUUIDLib
    private readonly generalDate: GeneralDateLib

    constructor() {
        this.repository = new CreateUserUseCaseRepository()
        this.validator = new CreateUserUseCaseValidator()
        this.generalUUID = new GeneralUUIDLib()
        this.generalDate = new GeneralDateLib()

        this.createUserUseCase = new CreateUserUseCase(this.repository, this.validator, this.generalUUID, this.generalDate)
    }

    public execute = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body

            const input = new CreateUserUseCaseDTOInput(name, email, password)
            const response = await this.createUserUseCase.execute(input)

            res.status(201).json(response)
        } catch (error: any) {
            res.status(201).json(new InternalErrorEntity(error.message))
        }
    }
}

class SingInController {
    private readonly signInUseCase: SingInUseCase
    private readonly repository: SingInUseCaseRepository
    private readonly validator: SingInUseCaseValidator


    constructor() {
        this.repository = new SingInUseCaseRepository()
        this.validator = new SingInUseCaseValidator()

        this.signInUseCase = new SingInUseCase(this.repository, this.validator)
    }

    public execute = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body

            const input = new SingInUseCaseDTOInput(email, password)
            const user = await this.signInUseCase.execute(input)

            res.status(201).json({ user, error: null })
        } catch (error: any) {
            if (error.code && error.code === 'validation') {
                res.status(201).json({ user: null, validationError: error.message })
            } else {
                res.status(201).json({ user: null, error: error.message })
            }
        }
    }
}

export {
    CreateUserController,
    SingInController
}