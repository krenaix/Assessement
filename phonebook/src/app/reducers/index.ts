import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import { log_out } from '../store/feature-stores/authentication/actions';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
      keys: ['user'],
      rehydrate: true
  })(reducer);
}

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // console.log('state', state);
    // console.log('action', action);

    if (action.type === log_out.type) {
      console.log('logging out', action);
      state = undefined;
    }
    return reducer(state, action);
  };
}

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] =  [localStorageSyncReducer, logout];
