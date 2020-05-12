import { createSelector, createFeatureSelector } from '@ngrx/store';
import { features } from 'src/app/features';
import { DashboardState } from './state';

const dashboardFeature = createFeatureSelector<DashboardState>(features.DASHBOARD_FEATURE);

export const getPhonebook = createSelector(
    dashboardFeature,
    state => state.phonebook
);

export const getPhonebookEntries = createSelector(
    dashboardFeature,
    state => state.phonebook.entries
);

export const getDashboardLoadingStatus = createSelector(
    dashboardFeature,
    state => state.status
);

export const getSearchCriteria = createSelector(
    dashboardFeature,
    state => state.searchCriteria
);

export const getCreateContactStatus = createSelector(
    dashboardFeature,
    state => state.createContactStatus
);

export const getEditContactStatus = createSelector(
    dashboardFeature,
    state => state.editContactStatus
);
