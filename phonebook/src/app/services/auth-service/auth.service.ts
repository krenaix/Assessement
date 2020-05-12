import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/interfaces';
import { isTokenValid } from 'src/app/store/feature-stores/authentication/selectors';
import { UserWithPhoneEntries } from 'src/app/models/interfaces/user_with_phone_entries.interface';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient, private store$: Store<{}>) {
    }

    authenticate(phoneNumber: string, password: string)  {

       return this.httpClient.put<IUser>(`${Routes.AUTHENTICATE}`, null, {
            params: {
                phoneNumber,
                password
            }
        });
    }

    register(phoneNumber: string, password: string, name: string) {

        return this.httpClient.post<boolean>(`${Routes.REGISTER}`, null, {
             params: {
                phoneNumber,
                 password,
                 name
             }
         });
     }

     isAuthenticated(): Observable<boolean> {
        return this.store$.select(isTokenValid);
    }
}
