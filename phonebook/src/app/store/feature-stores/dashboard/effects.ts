import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services';
import * as dashboardActions from './actions';
import { getPhonebook, getSearchCriteria } from './selector';
import { getUser } from '../authentication/selectors';

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

    removeContact$ = createEffect(() => this.actions$.pipe(
        ofType(
            dashboardActions.remove_contact
        ),
        withLatestFrom(this.store$.select(getPhonebook), this.store$.select(getSearchCriteria)),
        mergeMap(([payload, phonebook, searchCriteria]) => this.dashboardService.remove(payload.entryId, phonebook.id, searchCriteria)
        ),
        map(filteredPhonebook => {
            return dashboardActions.remove_contact_successfull({phonebook: filteredPhonebook});
        })
        // catchError(error)
    ));

    fetchContacts$ = createEffect(() => this.actions$.pipe(
        ofType(
            dashboardActions.get_contacts
        ),
        withLatestFrom(this.store$.select(getUser)),
        mergeMap(([payload, user]) => this.dashboardService.fetchContacts(user.id)
        ),
        map(filteredPhonebook => {
            return dashboardActions.get_contacts_successfull({phonebook: filteredPhonebook});
        }),
        catchError(error => of(dashboardActions.get_contacts_failed()))
    ));

    createContact$ = createEffect(() => this.actions$.pipe(
        ofType(
            dashboardActions.create_contact
        ),
        withLatestFrom(this.store$.select(getPhonebook)),
        mergeMap(([payload, phonebook]) => this.dashboardService.createContact(payload.entry, phonebook.id)
        ),
        map(result => {
            if (result) {
                return dashboardActions.create_contact_Successfull();
            } else {
                return dashboardActions.create_contact_failed();
            }
        })
        // catchError(error)
    ));

    editContact$ = createEffect(() => this.actions$.pipe(
        ofType(
            dashboardActions.edit_contact
        ),
        mergeMap((payload) => this.dashboardService.editContact(payload.entry)
        ),
        map(result => {
            if (result) {
                return dashboardActions.edit_contact_Successfull();
            }
        })
        // catchError(error)
    ));
}
