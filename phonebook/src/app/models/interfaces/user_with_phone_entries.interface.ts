import { IUser } from './Iuser';
import { Phonebook } from './phonebook.interface';

export interface UserWithPhoneEntries {
    user: IUser;
    phoneEntries: Phonebook;
}