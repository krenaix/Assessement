import { IUser, Phonebook, SearchCriteria } from 'src/app/models/interfaces';
import { StatusEnum } from 'src/app/models/enums';



export interface DashboardState {
    status: StatusEnum;
    phonebook: Phonebook;
    searchCriteria: SearchCriteria;
    createContactStatus: StatusEnum;
    editContactStatus: StatusEnum;
}

export const initialDashboardState: DashboardState = {
    status: StatusEnum.InitialLoad,
    phonebook: null,
    searchCriteria: { entryName: '', entryNumber: '' },
    createContactStatus: StatusEnum.InitialLoad,
    editContactStatus: StatusEnum.InitialLoad
};
