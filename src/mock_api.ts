import { ServerError } from './server_error';
import { injectable } from 'inversify';

@injectable()
export class MockApi {
    defaultTimeout = 1000;

    returnResolvedPromise<T>(value: T, timeout?: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(
                () => {
                    resolve(value);
                },
                timeout ? timeout : this.defaultTimeout
            );
        });
    }

    returnRejectedPromise<T>(err: ServerError, timeout?: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(
                () => {
                    reject(err);
                },
                timeout ? timeout : this.defaultTimeout
            );
        });
    }
}
