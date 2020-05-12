import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { JWTAccessToken } from 'src/app/models/interfaces';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    tokenExpired(token: string) {

        if (!token) {
            return false;
        }

        try {
            const tokenObject = jwtDecode<{ exp: number }>(token);

            const expiryDateInSecondsSinceEpoch = tokenObject.exp;

            const now = new Date();
            const nowInSecondsSinceEpoch = Math.floor(now.getTime() / 1000);

            return nowInSecondsSinceEpoch > expiryDateInSecondsSinceEpoch;
        } catch (e) {
            return false;
        }
    }

    tokenValid(token: string) {
        return token && !this.tokenExpired(token);
    }

    decodeToken(token?: string): JWTAccessToken {
        if (!token) {
            return null;
        }

        try {
            const decToken = jwtDecode<JWTAccessToken>(token);
            return { sub: decToken.sub };
        } catch {
            return null;
        }
    }
}
