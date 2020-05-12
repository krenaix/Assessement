import { IUser, Phonebook } from 'src/app/models/interfaces';
import { StatusEnum } from 'src/app/models/enums';



export interface DashboardState {
    status: StatusEnum;
    phonebook: Phonebook;
}

export const initialDashboardState: DashboardState = {
    status: StatusEnum.InitialLoad,
    phonebook: null
};
