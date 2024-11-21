import { UserEntity } from "../../../core/entity/user"

interface CreateUserUseCaseRepositoryInterface {
    intert(user: UserEntity): Promise<UserEntity | null>
    hashPassword(password: string): Promise<string>
}

interface SingInUseCaseRepositoryInterface {
    getUserByEmail(email: string): Promise<UserEntity | null>
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>
    encodeToken(data: any, expiresIn: string): string | null
}

export {
    CreateUserUseCaseRepositoryInterface,
    SingInUseCaseRepositoryInterface
}