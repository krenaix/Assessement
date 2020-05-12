import { createAction, props } from '@ngrx/store';
import { SearchCriteria, Phonebook } from 'src/app/models/interfaces';


export const search = createAction('[Search Clients] Search Clients',props<{searchCriteria: SearchCriteria}>());
export const search_successfull = createAction('[Search Clients] Search Clients Successfull',props<{phonebook: Phonebook}>());
