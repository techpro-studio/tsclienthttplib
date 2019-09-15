import { injectable } from 'inversify';
import 'reflect-metadata';

// tslint:disable-next-line:interface-name
export interface TokenHolder {
  token: string;
  deleteToken: () => void;
}

@injectable()
export class LocalStorageTokenHolder implements TokenHolder {
  private tokenStorageKey = '';

  get token(): string {
    const value = localStorage.getItem(this.tokenStorageKey);
    return value ? value : '';
  }

  set token(value: string) {
    localStorage.setItem(this.tokenStorageKey, value);
  }

  public deleteToken = () => {
    localStorage.removeItem(this.tokenStorageKey);
  };
}
