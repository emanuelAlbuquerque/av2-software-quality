class ErrorEntity {
    constructor(
        public code: string,
        public message: string,
        public statusCode: number
    ) { }
}

class ValidationErrorEntity extends ErrorEntity {
    constructor(message: string) {
        super('validation', message, 422)
    }
}

class InternalErrorEntity extends ErrorEntity {
    constructor(message: string) {
        super('internal', `Erro Interno do Servidor - ${message}`, 500)
    }
}

export {
    ValidationErrorEntity,
    InternalErrorEntity,
    ErrorEntity
}