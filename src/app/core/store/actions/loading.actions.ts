import { createAction, props } from '@ngrx/store';

export const showLoader = createAction(
    '[Loading] Show Loader'
);

export const hideLoader = createAction(
    '[Loading] Hide Loader'
);
