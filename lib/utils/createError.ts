import {ApplicationError, IOptions} from "../exceptions/ApplicationError";

export function createError(error: IOptions, overrides: {}) {
    return new ApplicationError(error, overrides)
}