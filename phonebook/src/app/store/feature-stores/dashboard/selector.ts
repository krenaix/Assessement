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
