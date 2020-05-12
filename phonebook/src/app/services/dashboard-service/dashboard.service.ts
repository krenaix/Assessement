import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { isTokenValid } from 'src/app/store/feature-stores/authentication/selectors';
import { SearchCriteria, Phonebook } from 'src/app/models/interfaces';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private httpClient: HttpClient, private store$: Store<{}>) {
    }

    search(searchCriteria: SearchCriteria, phonebook_id: number) {
        return this.httpClient.put<Phonebook>(Routes.SEARCH, searchCriteria, {
            params: {
                phonebookId: phonebook_id.toString()
            }
        });
    }
}
