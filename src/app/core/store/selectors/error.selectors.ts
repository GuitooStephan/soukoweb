import { State } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers/root.reducers';

const selectApp = createFeatureSelector<AppState, State>('souko');

export const selectError = createSelector(
    selectApp,
    (state: State) => state.error
);
