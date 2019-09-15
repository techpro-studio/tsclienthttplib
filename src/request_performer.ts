import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BaseURLHolder } from './base_url_holder';
import { injectTypes } from './inject_types';
import { RequestParams } from './request_params';
import { ServerError, ServerErrorBody } from './server_error';

// tslint:disable-next-line:interface-name
export interface RequestPerformer {
    performRequest<T>(request: RequestParams): Promise<T>;
}

function queryParams(params: any): string {
    if (!params) {
        return '';
    }
    return Object.keys(params)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function withQuery(url: string, params: any): string {
    const queryString = queryParams(params);
    return queryString
        ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString
        : url;
}

@injectable()
export class DefaultRequestPerformer implements RequestPerformer {
    constructor(
        @inject(injectTypes.baseURLHolder) private baseURLHolder: BaseURLHolder
    ) {}

    public async performRequest<T>(request: RequestParams): Promise<T> {
        const ignoreCache = request.ignoreCache || false;
        const headers = request.headers || {};
        const timeout = request.timeout || 5000;

        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(
                request.method.toString(),
                withQuery(
                    this.baseURLHolder.baseURL + request.relativeURL,
                    request.query
                )
            );

            if (headers) {
                Object.keys(headers).forEach((key) =>
                    xhr.setRequestHeader(key, headers[key])
                );
            }

            if (ignoreCache) {
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }

            xhr.timeout = timeout;

            xhr.onload = () => {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (xhr.status < 400) {
                        resolve(response as T);
                    } else {
                        const serverErrorBody = response as ServerErrorBody;
                        const serverError: ServerError = Object.assign(
                            serverErrorBody,
                            { statusCode: xhr.status }
                        );
                        reject(serverError);
                    }
                } catch (e) {
                    reject({
                        errors: [
                            {
                                code: 'UNDEFINED_ERROR',
                                description: `Error: ${e.toString()}`
                            }
                        ],
                        statusCode: 0
                    });
                }
            };

            xhr.onerror = (evt) => {
                reject({
                    errors: [{ code: 'UNDEFINED_ERROR' }],
                    statusCode: 0
                });
            };

            xhr.ontimeout = (evt) => {
                reject({ errors: { code: 'timeout' }, statusCode: 0 });
            };

            if (request.body) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(request.body));
            } else if (request.formData) {
                xhr.send(request.formData);
            } else {
                xhr.send();
            }
        });
    }
}
