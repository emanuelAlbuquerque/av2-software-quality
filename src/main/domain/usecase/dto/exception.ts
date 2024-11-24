import { ErrorEntity } from "./error"

class ExceptionUseCaseDTOOutput {
    constructor(
        public error: ErrorEntity | null,
    ) { }
}

export {
    ExceptionUseCaseDTOOutput
}