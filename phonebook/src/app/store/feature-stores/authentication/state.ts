import { IUser, Phonebook } from 'src/app/models/interfaces';
import { StatusEnum } from 'src/app/models/enums';

export interface UserState {
    user: IUser;
    loginStatus: StatusEnum;
    registerStatus: StatusEnum;
}

export const initialUserState: UserState = {
    user: null,
    loginStatus: StatusEnum.InitialLoad,
    registerStatus: StatusEnum.InitialLoad
};
