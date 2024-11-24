import { CreateUserUseCaseDTOInput, SingInUseCaseDTOInput } from "../../../../domain/usecase/dto/user"
import { Validator } from "../../../../domain/usecase/port/validator"
import { getUserByEmail } from "../../external/database/postgress/user"

class CreateUserUseCaseValidator implements Validator<CreateUserUseCaseDTOInput> {
    async execute(input: CreateUserUseCaseDTOInput): Promise<string | null> {
        if (!input?.name) {
            return 'O nome é obrigatório.'
        } else if (input.name.length > 255) {
            return 'O Nome ultrapassou o limite de 255 caracteres.'
        }

        if (!input?.email) {
            return 'O E-mail é obrigatório.'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            if (!emailRegex.test(input.email)) {
                return 'Insira um e-mail válido.'
            }

            if (input.email.length > 255) {
                return 'O E-mail ultrapassou o limite de caracteres.'
            }

            const user = await getUserByEmail(input.email)
            if (user && user.userId) {
                return 'Este E-mail já está em uso por outro usuário.'
            }
        }

        if (!input?.password) {
            return 'A senha é obrigatória.'
        } else {
            if (input.password.length < 8) {
                return 'A senha precisa ter pelo menos 8 caracteres.'
            }

            const passwordHasNumber = /\d/
            if (!passwordHasNumber.test(input.password)) {
                return 'A senha deve incluir pelo menos um número.'
            }
        }

        return null
    }
}

class SingInUseCaseValidator implements Validator<SingInUseCaseDTOInput> {
    async execute(input: SingInUseCaseDTOInput): Promise<string | null> {
        if (!input?.email) {
            return 'O E-mail é obrigatório.'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(input.email)) {
                return 'Insira um e-mail válido.'
            }
        }
    
        if (!input?.password) {
            return 'A senha é obrigatória.'
        }

        return null
    }
}

export {
    CreateUserUseCaseValidator,
    SingInUseCaseValidator
}