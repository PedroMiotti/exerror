import express from "express";
import {ApplicationError, IOptions} from "../exceptions/ApplicationError";
import { createError } from './createError';

export function formatError(error: Error, overrides = {}) {
    // `Error.stack`'s `enumerable` property descriptor is `false`
    // Thus, `JSON.stringify(...)` doesn't enumerate over it.
    const stackTrace = JSON.stringify(error, ['stack'], 4) || {};
    const newError = JSON.parse(JSON.stringify(error));

    // No need to send to client
    newError.statusCode = undefined;

    return {
        error: {
            ...newError,
            stack: stackTrace.stack
        },
        success: false,
        ...overrides
    }
}

export function formatResponse(result: {}, override = {}) {
    return {
        data: result,
        success: true,
        ...override
    }
}

export function sendResponse(res: express.Response, payload: IOptions | Error, statusCode: number = 200, context: {} = {}) {
    if (payload instanceof ApplicationError) {
        const code = payload.statusCode || 500
        console.log(payload)
        return res.status(code).json(formatError(payload))
    }

    if (payload instanceof Error) {
        const newError = createError(payload, {})
        const code = newError.statusCode || 500
        return res.status(code).json(formatError(newError))
    }

    return res.status(statusCode).json(formatResponse(payload))
}