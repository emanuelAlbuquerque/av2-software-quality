import { InternalErrorEntity } from "./dto/error"
import { ExceptionUseCaseDTOOutput } from "./dto/exception"

class ExceptionUseCase {
    constructor() { }

    public async execute(): Promise<ExceptionUseCaseDTOOutput> {
        try {
            throw new Error('Connection Refused')
        } catch (error: any) {
            console.log(error)
            return new ExceptionUseCaseDTOOutput(new InternalErrorEntity(error.message))
        }
    }
}

export {
    ExceptionUseCase
}