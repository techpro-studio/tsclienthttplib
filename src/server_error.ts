export interface Error {
    code: string;
    description?: string;
    args?: Array<any>;
    key?: string;
}

export interface ServerErrorBody {
    errors: Array<Error>;
}

export interface ServerError extends ServerErrorBody {
    statusCode: number;
}

function isServerError(value: any): value is ServerError {
    return (<ServerError>value).errors !== undefined;
}

export function isUnauthorizedError(error: any) {
    return getErrorStatusCode(error) === 401;
}

export function getErrorStatusCode(error: any): number {
    if (error === undefined || error === null) {
        return 0;
    }
    if (isServerError(error)) {
        return error.statusCode;
    }
    return 0;
}

export function getErrorMessage(error: any): string {
    if (error === undefined || error === null) {
        return 'undefined error';
    }
    if (isServerError(error)) {
        let err: Error = error.errors[0];
        return err.description ? err.description : err.code;
    }
    return error.toString();
}
