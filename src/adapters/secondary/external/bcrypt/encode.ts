import { hash, compare } from 'bcrypt'

async function hashPassword(password: string) {
    const saltRounds = 10
    const hashedPassword = await hash(password, saltRounds)

    return hashedPassword
}

async function verifyPassword(plainPassword: string, hashedPassword: string) {
    const isMatch = await compare(plainPassword, hashedPassword)

    return isMatch
}

export {
    hashPassword,
    verifyPassword
}