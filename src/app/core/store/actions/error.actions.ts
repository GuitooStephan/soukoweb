import { createAction, props } from '@ngrx/store';

export const loadError = createAction(
    '[Error] Load Error',
    props<{ error: any }>()
);

export const loadErrorSuccess = createAction(
    '[Error] Load Error Success'
);

export const clearError = createAction(
    '[Error] Clear Error'
);
