import { object, string } from "yup"
import { getUserByEmail } from "../../../external/database/postgress/user"
import { CreateUserUseCaseDTOInput } from "../../../../../domain/usecase/dto/user"

async function getUserValidatorSchema(input: CreateUserUseCaseDTOInput | null) {
    return object().shape({
        name: string().required('O nome é obrigatório.').max(255, 'O Nome ultrapassou o limite de caracteres.'),
        email: string()
            .test('unique-email', 'Este E-mail já esta em uso por outro usuário.', async () => {
                if (input) {
                    const user = await getUserByEmail(input.email)
                    if (user && user.userId) {
                        return false
                    }
                }

                return true
            })
            .email('Insira um e-mail válido.')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Insira um e-mail válido.')
            .max(255, 'O E-mail ultrapassou o limite de caracteres.')
        ,
        password: string()
            .min(8, 'A senha precisa ter pelo menos 8 caracteres.')
            .matches(/\d/, 'A senha deve incluir pelo menos um número.')
            .required('A senha é obrigatória.'),
    })
}

export {
    getUserValidatorSchema
}