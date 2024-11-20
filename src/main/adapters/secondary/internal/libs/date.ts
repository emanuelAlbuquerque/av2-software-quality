import { DateTime } from "luxon"
import { GeneralDateLibInterface } from "../../../../domain/usecase/port/lib/date"

class GeneralDateLib implements GeneralDateLibInterface {
    generateDate(): Date {
        return DateTime.local().toJSDate()
    }
}

export {
    GeneralDateLib 
}