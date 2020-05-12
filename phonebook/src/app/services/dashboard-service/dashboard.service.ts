import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { isTokenValid } from 'src/app/store/feature-stores/authentication/selectors';
import { SearchCriteria, Phonebook, Entry } from 'src/app/models/interfaces';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private httpClient: HttpClient, private store$: Store<{}>) {
    }

    search(searchCriteria: SearchCriteria, phonebook_id: number) {
        return this.httpClient.post<Phonebook>(Routes.SEARCH, searchCriteria, {
            params: {
                phonebookId: phonebook_id.toString()
            }
        });
    }

    remove(contact_id: number, phonebook_id: number, searchCriteria: SearchCriteria) {
        return this.httpClient.put<Phonebook>(Routes.REMOVE_CONTACT, searchCriteria, {
            params: {
                phonebookId: phonebook_id.toString(),
                entryId: contact_id.toString()
            }
        });
    }

    fetchContacts(userId: number) {
        return this.httpClient.get<Phonebook>(Routes.FETCH_CONTACTS, {
            params: {
                userId: userId.toString()
            }
        });
    }

    createContact(entry: Entry, phonebook_id: number) {
        return this.httpClient.put<boolean>(Routes.CREATE_CONTACT, entry, {
            params: {
                phonebookId: phonebook_id.toString()
            }
        });
    }

    editContact(entry: Entry) {
        return this.httpClient.put<boolean>(Routes.EDIT_CONTACT, entry);
    }
}
