import { State } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers/root.reducers';

const selectApp = createFeatureSelector<AppState, State>('souko');

export const selectLoading = createSelector(
    selectApp,
    (state: State) => state.loading
);
