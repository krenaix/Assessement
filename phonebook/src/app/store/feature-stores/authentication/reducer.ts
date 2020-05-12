import { createReducer, on, State, Action } from '@ngrx/store';
import { initialUserState, UserState } from './state';
import * as authActions from './actions';
import { StatusEnum } from 'src/app/models/enums';

const reducer = createReducer(
    initialUserState,
    on(authActions.login, state => ({
        ...state,
        loginStatus: StatusEnum.Busy
    })),
    on(authActions.login_successful, (state, { user, phonebook }) => ({
        ...state,
        loginStatus: StatusEnum.Done,
        user
    })),
    on(authActions.login_failed, state => ({
        ...state,
        loginStatus: StatusEnum.Failed
    })),
    on(authActions.register, state => ({
        ...state,
        registerStatus: StatusEnum.Busy
    })),
    on(authActions.register_successful, state => ({
        ...state,
        registerStatus: StatusEnum.Done
    })),
    on(authActions.register_failed, state => ({
        ...state,
        registerStatus: StatusEnum.Failed
    }))
);

export function userReducer(
    state: UserState | undefined,
    action: Action) {
    return reducer(state, action);
}
