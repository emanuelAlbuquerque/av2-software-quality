import { UserEntity } from "../../../../domain/core/entity/user"
import { CreateUserUseCaseRepositoryInterface, SingInUseCaseRepositoryInterface } from "../../../../domain/usecase/port/repository/user"
import { hashPassword, verifyPassword } from "../../external/bcrypt/encode"
import { getUserByEmail, insertUser } from "../../external/database/postgress/user"

class CreateUserUseCaseRepository implements CreateUserUseCaseRepositoryInterface {
    async hashPassword(password: string): Promise<string> {
        return await hashPassword(password)
    }

    async intert(user: UserEntity): Promise<UserEntity | null> {
        return await insertUser(user)
    }
}

class SingInUseCaseRepository implements SingInUseCaseRepositoryInterface {
    async getUserByEmail(email: string): Promise<UserEntity | null> {
        return await getUserByEmail(email)
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await verifyPassword(plainPassword, hashedPassword)
    }
}

export {
    CreateUserUseCaseRepository,
    SingInUseCaseRepository
}