import { UserEntity } from "../../../../../../domain/core/entity/user"
import { UserModel } from "../models/user"

function converterUserEntityToModel(user: UserEntity): UserModel {
    return new UserModel(
        user.userId,
        user.name,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt
    )
}

function converterUserModelToEntity(user: UserModel): UserEntity {
    return new UserEntity(
        user.userId,
        user.name,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt
    )
}

function converterUserRowSQLToEntity(row: any): UserEntity {
    return new UserEntity(
        row.user_id,
        row.name,
        row.email,
        row.password,
        row.created_at,
        row.updated_at
    )
}

export {
    converterUserEntityToModel,
    converterUserModelToEntity,
    converterUserRowSQLToEntity
}
