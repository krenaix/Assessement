import { environment } from 'src/environments/environment';
export const Routes = {
    AUTHENTICATE: `${environment.serviceUrl}/api/auth/authenticate`,
    REGISTER: `${environment.serviceUrl}/api/auth/register`,
    SEARCH: `${environment.serviceUrl}/api/phonebook/search/`,
    REMOVE_CONTACT: `${environment.serviceUrl}/api/phonebook/remove/`,
    FETCH_CONTACTS: `${environment.serviceUrl}/api/phonebook/contacts/`,
    CREATE_CONTACT: `${environment.serviceUrl}/api/phonebook/create/`,
    EDIT_CONTACT: `${environment.serviceUrl}/api/phonebook/edit/`,
};
