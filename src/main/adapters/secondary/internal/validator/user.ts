import { CreateUserUseCaseDTOInput, SingInUseCaseDTOInput } from "../../../../domain/usecase/dto/user"
import { Validator } from "../../../../domain/usecase/port/validator"
import { getUserValidatorSchema } from "./schemas/user"

class CreateUserUseCaseValidator implements Validator<CreateUserUseCaseDTOInput> {
    async execute(input: CreateUserUseCaseDTOInput): Promise<string | null> {
        const userSchema = await getUserValidatorSchema(input)

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
    execute(input: SingInUseCaseDTOInput): string | null {
        const errors: string[] = []
        let error: string | null = null

        if (!input.password) {
            errors.push('A senha não pode ser vazia.')
        }

        if (!input.email) {
            errors.push('O e-mail é obrigatório.')
        }

        if (errors.length > 0) {
            error = errors.join(',')
        }

        return error
    }
}

export {
    CreateUserUseCaseValidator,
    SingInUseCaseValidator
}