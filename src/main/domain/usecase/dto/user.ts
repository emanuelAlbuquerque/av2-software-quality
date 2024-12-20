import { UserEntity, UserResponseEntity } from "../../core/entity/user";
import { ErrorEntity } from "./error";

class CreateUserUseCaseDTOInput {
    constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }
}

class CreateUserUseCaseDTOOutput {
    constructor(
        public user: UserEntity | null,
        public error: ErrorEntity | null,
    ) { }
}

class SingInUseCaseDTOInput {
    constructor(
        public email: string,
        public password: string
    ) { }
}

class SingInUseCaseDTOOutput {
    constructor(
        public token: string | null,
        public error: ErrorEntity | null,
    ) { }
}

export {
    CreateUserUseCaseDTOInput,
    CreateUserUseCaseDTOOutput,
    SingInUseCaseDTOInput,
    SingInUseCaseDTOOutput
}
