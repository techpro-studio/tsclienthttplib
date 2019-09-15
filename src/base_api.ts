import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { injectTypes } from './inject_types';
import { RequestFactory } from './request_factory';
import { RequestPerformer } from './request_performer';

@injectable()
export class BaseApi {
  // tslint:disable-next-line:variable-name
  protected _requestPerformer: RequestPerformer;
  // tslint:disable-next-line:variable-name
  protected _requestFactory: RequestFactory;

  constructor(
    @inject(injectTypes.requestPerformer)
    requestPerformer: RequestPerformer,
    @inject(injectTypes.requestFactory) requestFactory: RequestFactory,
  ) {
    this._requestPerformer = requestPerformer;
    this._requestFactory = requestFactory;
  }
}
