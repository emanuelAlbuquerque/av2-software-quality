import { sign } from 'jsonwebtoken'

function encodeToken(data: any, expiresIn: string): string | null {
    const token = sign(data, process.env.JWT_SECRET_KEY as string, { expiresIn })

    if(token) {
        return token
    }

    return null
}

export {
    encodeToken
}