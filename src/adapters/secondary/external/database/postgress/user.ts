import { UserEntity } from "../../../../../domain/core/entity/user"
import { converterUserEntityToModel, converterUserModelToEntity, converterUserRowSQLToEntity } from "./converters/user"
import { dataSourceBuilder } from "./data-source-builder"
import { UserModel } from "./models/user"

async function insertUser(user: UserEntity): Promise<UserEntity | null> {
    const manager = await dataSourceBuilder.getManager()

    console.log(manager)

    if (manager) {
        const model = converterUserEntityToModel(user)

        const res = await manager
            .createQueryBuilder()
            .insert()
            .into(UserModel)
            .values(model)
            .returning('*')
            .execute()

        const [row] = res.raw

        return row ? converterUserRowSQLToEntity(row) : null
    }

    return null
}

async function getUserByEmail(email: string): Promise<UserEntity | null> {
    const repository = await dataSourceBuilder.getRepository(UserModel)

    if (repository) {
        const user: any = await repository.findOne({ where: { email } })
        
        return user ? converterUserModelToEntity(user) : null
    }

    return null
}

export {
    insertUser,
    getUserByEmail
}