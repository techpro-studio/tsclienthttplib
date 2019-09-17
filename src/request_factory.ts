import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { injectTypes } from './inject_types';
import { HTTPMethod, RequestParams } from './request_params';
import { SecretHolder } from './secret_holder';
import { TokenHolder } from './token_holder';

// tslint:disable-next-line:interface-name
export interface RequestFactory {
  make(method: HTTPMethod, relativeURl: string, query?: any, body?: any, formData?: FormData): RequestParams;
}

@injectable()
export class DefaultRequestFactory implements RequestFactory {
  constructor(
    @inject(injectTypes.tokenHolder) private tokenHolder: TokenHolder,
    @inject(injectTypes.secretHolder) private secretHolder: SecretHolder,
  ) {}

  public make(method: HTTPMethod, relativeURl: string, query?: any, body?: any, formData?: FormData): RequestParams {
    const headers: { [key: string]: any } = {};
    const token = this.tokenHolder.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (this.secretHolder.secret) {
      headers.Secret = this.secretHolder.secret;
    }
    return {
      method,
      relativeURL: relativeURl,
      // tslint:disable-next-line:object-literal-sort-keys
      query,
      body,
      formData,
      ignoreCache: true,
      headers,
      timeout: 23000,
    };
  }
}
