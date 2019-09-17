import { injectable } from 'inversify';
import 'reflect-metadata';

// tslint:disable-next-line:interface-name
export interface TokenHolder {
  getToken: ()=> string|null;
  setToken: (value:string)=>void;
  deleteToken: () => void;
}

@injectable()
export class LocalStorageTokenHolder implements TokenHolder {
  private tokenStorageKey = '';

  public getToken(): string|null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  public setToken(value: string){
    localStorage.setItem(this.tokenStorageKey, value);
  }

  public deleteToken = () => {
    localStorage.removeItem(this.tokenStorageKey);
  };
}
