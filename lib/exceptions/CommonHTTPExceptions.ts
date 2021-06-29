import { ERROR_TYPES } from '../enum/ErrorsTypes';

const CommonHTTPExceptions = {
    // Application custom errors
    UNKNOWN_ERROR: {
        type: ERROR_TYPES.UNKNOWN,
        code: "UNKNOWN_ERROR",
        message: "Unknown error",
        statusCode: 500,
    },

    // Predefined 4xx http errors
    BAD_REQUEST: {
        type: ERROR_TYPES.CLIENT,
        code: "BAD_REQUEST",
        message: "Bad request",
        statusCode: 400,
    },
    UNAUTHORIZED: {
        type: ERROR_TYPES.CLIENT,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
        statusCode: 401,
    },
    FORBIDDEN: {
        type: ERROR_TYPES.CLIENT,
        code: "FORBIDDEN",
        message: "Forbidden",
        statusCode: 403,
    },
    RESOURCE_NOT_FOUND: {
        type: ERROR_TYPES.CLIENT,
        code: "RESOURCE_NOT_FOUND",
        message: "Resource not found",
        statusCode: 404,
        meta: {
            translationKey: "app.common.error.RESOURCE_NOT_FOUND",
        },
    },

    // Predefined 5xx http errors
    INTERNAL_SERVER_ERROR: {
        type: ERROR_TYPES.NETWORK,
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong, Please try again later.",
        statusCode: 500,
        meta: {
            shouldRedirect: true,
        },
    },
    BAD_GATEWAY: {
        type: ERROR_TYPES.NETWORK,
        code: "BAD_GATEWAY",
        message: "Bad gateway",
        statusCode: 502,
    },
    SERVICE_UNAVAILABLE: {
        type: ERROR_TYPES.NETWORK,
        code: "SERVICE_UNAVAILABLE",
        message: "Service unavailable",
        statusCode: 503,
    },
    GATEWAY_TIMEOUT: {
        type: ERROR_TYPES.NETWORK,
        code: "GATEWAY_TIMEOUT",
        message: "Gateway timeout",
        statusCode: 504,
    },
};

export { CommonHTTPExceptions };