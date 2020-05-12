import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services';
import * as dashboardActions from './actions';
import { getPhonebook } from './selector';

@Injectable()
export class DashboardEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<{}>,
        private router: Router,
        private dashboardService: DashboardService
    ) { }

    performSearch$ = createEffect(() => this.actions$.pipe(
        ofType(
            dashboardActions.search
        ),
        withLatestFrom(this.store$.select(getPhonebook)),
        mergeMap(([payload, phonebook]) => this.dashboardService.search(payload.searchCriteria, phonebook.id)
        ),
        map(filteredPhonebook => {
            return dashboardActions.search_successfull({phonebook: filteredPhonebook});
        })
        // catchError(error)
    ));
}
