import { CreateUserUseCaseDTOInput, SingInUseCaseDTOInput } from "../../../../domain/usecase/dto/user"
import { Validator } from "../../../../domain/usecase/port/validator"
import { createUserValidatorSchema, singInUserValidatorSchema } from "./schemas/user"

class CreateUserUseCaseValidator implements Validator<CreateUserUseCaseDTOInput> {
    async execute(input: CreateUserUseCaseDTOInput): Promise<string | null> {
        const userSchema = await createUserValidatorSchema(input)

        try {
            await userSchema.validate(input, { abortEarly: false })

            return null
        } catch (validationError: any) {
            if (validationError.errors) {
                return validationError.errors.join(' ')
            }

            return validationError.message || 'Erro desconhecido'
        }
    }
}

class SingInUseCaseValidator implements Validator<SingInUseCaseDTOInput> {
    async execute(input: SingInUseCaseDTOInput): Promise<string | null> {
        const userSchema = await singInUserValidatorSchema(input)

        try {
            await userSchema.validate(input, { abortEarly: false })

            return null
        } catch (validationError: any) {
            if (validationError.errors) {
                return validationError.errors.join(' ')
            }

            return validationError.message || 'Erro desconhecido'
        }
    }
}

export {
    CreateUserUseCaseValidator,
    SingInUseCaseValidator
}