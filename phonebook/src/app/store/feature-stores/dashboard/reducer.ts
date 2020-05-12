import { createReducer, on, State, Action } from '@ngrx/store';
import { initialDashboardState, DashboardState } from './state';
import * as dashboardActions from './actions';
import { StatusEnum } from 'src/app/models/enums';
import { log_out } from '../authentication/actions';

const reducer = createReducer(
  initialDashboardState,
  on(dashboardActions.get_contacts, state => ({
    ...state,
    status: StatusEnum.Busy,
    editContactStatus: StatusEnum.InitialLoad
  })),
  on(dashboardActions.get_contacts_successfull, (state, { phonebook }) => ({
    ...state,
    phonebook,
    status: StatusEnum.Done
  })),
  on(dashboardActions.get_contacts_failed, state => ({
    ...state,
    status: StatusEnum.Failed
  })),
  on(dashboardActions.search, (state, { searchCriteria}) => ({
    ...state,
    status: StatusEnum.Busy,
    searchCriteria
  })),
  on(dashboardActions.search_successfull, (state, { phonebook }) => ({
    ...state,
    phonebook,
    status: StatusEnum.Done
  })),
  on(dashboardActions.remove_contact, state => ({
    ...state,
    status: StatusEnum.Busy
  })),
  on(dashboardActions.remove_contact_successfull, (state, { phonebook }) => ({
    ...state,
    status: StatusEnum.Done,
    phonebook
  })),
  on(dashboardActions.create_contact, state => ({
    ...state,
    createContactStatus: StatusEnum.Busy
  })),
  on(dashboardActions.create_contact_Successfull, state => ({
    ...state,
    createContactStatus: StatusEnum.Done,
  })),
  on(dashboardActions.create_contact_failed, state => ({
    ...state,
    createContactStatus: StatusEnum.Failed,
  })),
  on(dashboardActions.edit_contact, state => ({
    ...state,
    editContactStatus: StatusEnum.Busy
  })),
  on(dashboardActions.edit_contact_Successfull, state => ({
    ...state,
    editContactStatus: StatusEnum.Done,
  })),
  on(dashboardActions.edit_contact_failed, state => ({
    ...state,
    editContactStatus: StatusEnum.Failed,
  }))

);

export function dashboardReducer(
  state: DashboardState | undefined,
  action: Action) {
  return reducer(state, action);
}
