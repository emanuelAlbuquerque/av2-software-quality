class ErrorEntity {
    constructor(
        public code: string,
        public message: string
    ) { }
}

class ValidationErrorEntity extends ErrorEntity {
    constructor(message: string) {
        super('validation', message)
    }
}

class InternalErrorEntity extends ErrorEntity {
    constructor(message: string) {
        super('internal', message)
    }
}

export {
    ValidationErrorEntity,
    InternalErrorEntity,
    ErrorEntity
}