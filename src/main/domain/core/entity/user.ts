class UserEntity {
    public userId: string
    public name: string
    public email: string
    public password: string
    public createdAt: Date
    public updatedAt: Date

    constructor(
        userId: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.userId = userId
        this.name = name
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

class UserResponseEntity {
    public userId: string
    public name: string
    public email: string

    constructor(
        userId: string,
        name: string,
        email: string,
    ) {
        this.userId = userId
        this.name = name
        this.email = email
    }
}

export {
    UserEntity,
    UserResponseEntity
}
