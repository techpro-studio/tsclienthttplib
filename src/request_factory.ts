import { HTTPMethod, RequestParams } from './request_params';
import { TokenHolder } from './token_holder';
import { SecretHolder } from './secret_holder';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { injectTypes } from './inject_types';

export interface RequestFactory {
    make(
        method: HTTPMethod,
        relativeURl: string,
        query?: any,
        body?: any,
        formData?: FormData
    ): RequestParams;
}

@injectable()
export class DefaultRequestFactory implements RequestFactory {
    constructor(
        @inject(injectTypes.tokenHolder) private tokenHolder: TokenHolder,
        @inject(injectTypes.secretHolder) private secretHolder: SecretHolder
    ) {}

    make(
        method: HTTPMethod,
        relativeURl: string,
        query?: any,
        body?: any,
        formData?: FormData
    ): RequestParams {
        let headers: {[key:string]: any} = {};
        if (this.tokenHolder.token) {
            headers['Authorization'] = `Bearer ${this.tokenHolder.token}`;
        }
        if (this.secretHolder.secret) {
            headers['Secret'] = this.secretHolder.secret;
        }
        return {
            method: method,
            relativeURL: relativeURl,
            query: query,
            body: body,
            formData: formData,
            ignoreCache: true,
            headers: headers,
            timeout: 23000
        };
    }
}
