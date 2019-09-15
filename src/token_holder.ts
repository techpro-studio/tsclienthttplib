import { injectable } from "inversify";
import 'reflect-metadata';

export interface TokenHolder {
    token: string;
    deleteToken: () => void;
}

@injectable()
export class LocalStorageTokenHolder implements TokenHolder {
    private tokenStorageKey = '';

    get token(): string {
        let value = localStorage.getItem(this.tokenStorageKey);
        return value ? value : "";
    }

    set token(value: string) {
        localStorage.setItem(this.tokenStorageKey, value);
    }

    deleteToken = () => {
        localStorage.removeItem(this.tokenStorageKey);
    };
}
