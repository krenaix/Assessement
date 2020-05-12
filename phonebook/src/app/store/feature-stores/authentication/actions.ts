import { createAction, props } from '@ngrx/store';
import { IUser, Phonebook } from 'src/app/models/interfaces';

export const login = createAction('[Login] Login', props<{phoneNumber: string, password: string}>());
export const login_successful = createAction('[Login Successful] Login Successful', props<{user: IUser}>());
export const login_failed = createAction('[Login Failed] Login Failed');

export const register = createAction('[Register] Register', props<{phoneNumber: string, password: string, name: string}>());
export const register_successful = createAction('[Register Successful] Register Successful');
export const register_failed = createAction('[Register Failed] Register Failed');

export const log_out = createAction('[Log Out] Log Out');
