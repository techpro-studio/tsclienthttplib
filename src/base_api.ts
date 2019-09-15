import { RequestPerformer } from './request_performer';
import { RequestFactory } from './request_factory';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { injectTypes } from './inject_types';

@injectable()
export class BaseApi {
    protected _requestPerformer: RequestPerformer;
    protected _requestFactory: RequestFactory;

    constructor(
        @inject(injectTypes.requestPerformer)
        requestPerformer: RequestPerformer,
        @inject(injectTypes.requestFactory) requestFactory: RequestFactory
    ) {
        this._requestPerformer = requestPerformer;
        this._requestFactory = requestFactory;
    }
}
