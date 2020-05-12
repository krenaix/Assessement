import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe, of } from 'rxjs';
import { switchMap, map, catchError, first, tap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { log_out } from 'src/app/store/feature-stores/authentication/actions';
import { userToken } from 'src/app/store/feature-stores/authentication/selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private tokenService: TokenService, private router: Router, private store$: Store<{}>) { }

    token$ = this.store$.select(userToken);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.token$.pipe(
            first(),
            tap(accessToken => {
                if (accessToken && this.tokenService.tokenExpired(accessToken)) {
                    this.store$.dispatch(log_out());
                }
            }),
            map(token => token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : new HttpHeaders()),
            map(authHeader => request.clone({ headers: authHeader })),
            switchMap(updatedRequest => next.handle(updatedRequest)),
            catchError(err => {
                return throwError(err);
            })
        );
    }
}
