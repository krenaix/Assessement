import { createAction, props } from '@ngrx/store';
import { SearchCriteria, Phonebook, Entry } from 'src/app/models/interfaces';


export const search = createAction('[Search Clients] Search Clients', props<{searchCriteria: SearchCriteria}>());
export const search_successfull = createAction('[Search Clients] Search Clients Successfull', props<{phonebook: Phonebook}>());
export const remove_contact = createAction('[Dashboard] Remove contact', props<{entryId: number}>());
export const remove_contact_successfull = createAction('[Dashboard] Remove contact successfull', props<{phonebook: Phonebook}>());


export const create_contact = createAction('[Dashboard] Create contact', props<{entry: Entry}>());
export const create_contact_Successfull = createAction('[Dashboard] Create contact successfull');
export const create_contact_failed = createAction('[Dashboard] Create contact failed');

export const edit_contact = createAction('[Dashboard] Edit contact', props<{entry: Entry}>());
export const edit_contact_Successfull = createAction('[Dashboard] Edit contact successfull');
export const edit_contact_failed = createAction('[Dashboard] Edit contact failed');

export const get_contacts = createAction('[Dashboard] Get contacts');
export const get_contacts_successfull = createAction('[Dashboard] Get contacts successfull', props<{phonebook: Phonebook}>());
export const get_contacts_failed = createAction('[Dashboard] Get contacts failed');
