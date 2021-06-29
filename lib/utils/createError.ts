import {ApplicationError, IOptions} from "../exceptions/ApplicationError";

export function createError(error: IOptions | Error, overrides: {}) {
    return new ApplicationError(error, overrides)
}