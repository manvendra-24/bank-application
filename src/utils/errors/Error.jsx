import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    constructor(specificMessage) {
        super(404, "Not Found", specificMessage)
    }
}
export class UnAuthorized extends CustomError {
    constructor(specificMessage) {
        super(405, "UnAuthorized", specificMessage)
    }
}
export class ValidationError extends CustomError {
    constructor(specificMessage) {
        super(500, "Bad Request", specificMessage)
    }
}