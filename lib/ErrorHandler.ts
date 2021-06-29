import express from 'express';

import { CommonHTTPExceptions, ApplicationError } from "./exceptions";
import { IOptions } from "./exceptions/ApplicationError";
import { formatError, sendResponse } from "./utils/formatError";
import { createError } from "./utils/createError";

export function errorHandler(err: Error | IOptions, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ApplicationError) {
        const code = err.statusCode || 500
        return res.status(code).json(formatError(err))
    }

    if (err instanceof Error) {
        const newError = createError(err, {})
        const code = newError.statusCode || 500
        return res.status(code).json(formatError(newError))
    }

    const unknownError = new ApplicationError(CommonHTTPExceptions.UNKNOWN_ERROR)
    return sendResponse(res, unknownError, unknownError.statusCode);
}

