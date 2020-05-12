import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '../services/index';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap, switchMapTo, switchMap, map, take, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { userToken } from '../store/feature-stores/authentication/selectors';
import { log_out } from '../store/feature-stores/authentication/actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private tokenService: TokenService,
              private store$: Store<{}>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store$.pipe(
      select(userToken),
      first(),
      tap((token) => {
        // console.log(token)
        if (this.tokenService.tokenExpired(token)) {
          this.store$.dispatch(log_out());
        }
      }),
      switchMap(token => this.tokenService.tokenExpired(token) ? of(false) : of(true))
    );
  }
}
