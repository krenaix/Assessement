import { createReducer, on, State, Action } from '@ngrx/store';
import { initialDashboardState, DashboardState } from './state';
import * as dashboardActions from './actions';
import { StatusEnum } from 'src/app/models/enums';
import { log_out, login_successful } from '../authentication/actions';

const reducer = createReducer(
    initialDashboardState,
  on(login_successful, (state, {user, phonebook}) => ({
    ...state,
    phonebook
  })),
  on(dashboardActions.search, state => ({
    ...state,
    status: StatusEnum.Busy
  })),
  on(dashboardActions.search_successfull, (state, {phonebook}) => ({
    ...state,
    phonebook,
    status: StatusEnum.Done
  }))
);

export function dashboardReducer(
  state: DashboardState | undefined,
  action: Action) {
  return reducer(state, action);
}
