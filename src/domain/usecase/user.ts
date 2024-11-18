import { GeneralDateLib } from "../../adapters/secondary/internal/libs/date"
import { GeneralUUIDLib } from "../../adapters/secondary/internal/libs/uuid"
import { UserEntity, UserResponseEntity } from "../core/entity/user"
import { ValidationErrorEntity } from "./dto/error"
import { CreateUserUseCaseDTOInput, CreateUserUseCaseDTOOutput, SingInUseCaseDTOInput } from "./dto/user"
import { CreateUserUseCaseRepositoryInterface, SingInUseCaseRepositoryInterface } from "./port/repository/user"
import { Validator } from "./port/validator"

class CreateUserUseCase {
    constructor(
        private repository: CreateUserUseCaseRepositoryInterface,
        private validator: Validator<CreateUserUseCaseDTOInput>,
        private generalUUID: GeneralUUIDLib,
        private generalDate: GeneralDateLib
    ) { }

    public async execute(input: CreateUserUseCaseDTOInput): Promise<CreateUserUseCaseDTOOutput> {
        try {
            const error = await this.validator.execute(input)

            if(error) {
                return new CreateUserUseCaseDTOOutput(null, new ValidationErrorEntity(error))
            }

            const user = await this.createUser(input)
            
            return new CreateUserUseCaseDTOOutput(user, null)
        } catch (error: any) {
            console.log(error)
            return new CreateUserUseCaseDTOOutput(null, error.message)
        }
    }
    
    private async createUser(input: CreateUserUseCaseDTOInput): Promise<UserEntity | null> {
        const hashPassword = await this.repository.hashPassword(input.password)
    
        const user = new UserEntity(
            this.generalUUID.generateUUId(),
            input.name,
            input.email,
            hashPassword,
            this.generalDate.generateDate(),
            this.generalDate.generateDate()
        )
    
        const userCreated = await this.repository.intert(user)
        
        return userCreated
    }
}

class SingInUseCase {
    constructor(
        private repository: SingInUseCaseRepositoryInterface,
        private validator: Validator<SingInUseCaseDTOInput>,
    ) { }

    public async execute(input: SingInUseCaseDTOInput): Promise<UserResponseEntity | null> {
        try {
            await this.validator.execute(input)

            const user = await this.repository.getUserByEmail(input.email)

            if (user) {
                const verifyPassword = await this.repository.verifyPassword(input.password, user.password)

                if (verifyPassword) {
                    return new UserResponseEntity(user.userId, user.name, user.email)
                } else {
                    throw new Error('Credênciais Inválida')
                }
            } else {
                throw new Error('Credênciais Inválida')
            }
        } catch (error: any) {
            console.log(error)
            throw error
        }
    }
}

export {
    CreateUserUseCase,
    SingInUseCase
}