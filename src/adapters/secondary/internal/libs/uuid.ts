import { v4 } from "uuid"
import { GeneralUUIDLibInterface } from "../../../../domain/usecase/port/lib/uuid"

class GeneralUUIDLib implements GeneralUUIDLibInterface {
    generateUUId(): string {
        return v4()
    }
}

export {
    GeneralUUIDLib 
}