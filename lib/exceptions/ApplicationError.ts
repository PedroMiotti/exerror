import { ERROR_TYPES } from '../enum/ErrorsTypes';

export interface IOptions {
    type: string;
    code: string;
    message: string;
    errors?: string;
    meta?: {};
    statusCode: number;
}

export class ApplicationError extends Error {
    private type: string;
    private code: string;
    private errors?: string;
    private meta?: {};
    public statusCode: number;

    constructor(options: IOptions, overrides?: any) {
        super();
        Object.assign(options, overrides); // Overwrite if it has the same key

        Object.setPrototypeOf(this, ApplicationError.prototype); // Ref: https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/

        if (!ERROR_TYPES.hasOwnProperty(options.type)) {
            throw new Error(`ApplicationError: ${options.type} is not a valid type.`);
        }

        if (!options.message) {
            throw new Error("ApplicationError: error message required.");
        }

        if (!options.code) {
            throw new Error("ApplicationError: error code required.");
        }

        this.name = "ApplicationError";
        this.type = options.type;
        this.code = options.code;
        this.message = options.message;
        this.errors = options.errors;
        this.meta = options.meta;
        this.statusCode = options.statusCode;
    }
}
