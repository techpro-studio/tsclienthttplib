import { injectable } from 'inversify';
import { ServerError } from './server_error';

@injectable()
export class MockApi {
  public defaultTimeout = 1000;

  public returnResolvedPromise<T>(value: T, timeout?: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      setTimeout(
        () => {
          resolve(value);
        },
        timeout ? timeout : this.defaultTimeout,
      );
    });
  }

  public returnRejectedPromise<T>(err: ServerError, timeout?: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      setTimeout(
        () => {
          reject(err);
        },
        timeout ? timeout : this.defaultTimeout,
      );
    });
  }
}
