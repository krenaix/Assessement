import { environment } from 'src/environments/environment';
export const Routes = {
    AUTHENTICATE: `${environment.serviceUrl}/api/auth/authenticate`,
    REGISTER: `${environment.serviceUrl}/api/auth/register`,
    SEARCH: `${environment.serviceUrl}/api/phonebook/search/`,
};
