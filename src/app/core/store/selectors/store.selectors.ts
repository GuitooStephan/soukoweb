import { State } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { of } from 'rxjs';

declare var _: any;

export const selectApp = createFeatureSelector<AppState, State>('souko');

export const selectStore = createSelector(
    selectApp,
    (state: State) => state.store
);

