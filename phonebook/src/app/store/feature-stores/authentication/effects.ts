import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, take, combineLatest, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { login, login_failed, login_successful, log_out, register, register_successful, register_failed } from '../authentication/actions';

@Injectable()
export class UserEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        mergeMap((payload) => {
            return this.authService.authenticate(payload.phoneNumber, payload.password
            );
        }),
        map(user => {
            if (user) {
                return login_successful({ user });
            } else {
                return login_failed();
            }
        }),
        catchError(error => {
            return of(login_failed());
        })
    )
    );

    register$ = createEffect(() => this.actions$.pipe(
        ofType(register),
        mergeMap((payload) => this.authService.register(payload.phoneNumber, payload.password, payload.name)
            .pipe(
                map(user => user),
                catchError((error) => of(null))
            )
        ),
        map(user => {
            if (user) {
                return register_successful();
            } else {
                return register_failed();
            }
        }),
        catchError(error => of(register_failed()))
    )
    );

    loginSuccessful$ = createEffect(() => this.actions$.pipe(
        ofType(login_successful),
        tap(payload => {
                this.router.navigate(['home']);
        })
    ), { dispatch: false }
    );

    registerSuccessful$ = createEffect(() => this.actions$.pipe(
        ofType(register_successful),
        tap(payload => {
            this.router.navigate(['login']);
        })
    ), { dispatch: false }
    );


    logOut$ = createEffect(() => this.actions$.pipe(
        ofType(log_out),
        tap(() => {
            this.router.navigate(['login']);
        })
    ), { dispatch: false }
    );


    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router,
        private toastsService: ToastrService,
        private store$: Store<{}>
    ) { }
}
