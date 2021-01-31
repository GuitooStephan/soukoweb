import { createAction, props } from '@ngrx/store';

export const createStore = createAction(
    '[Store] Create Store',
    props<{ data: any }>()
);

export const createStoreSuccess = createAction(
    '[Store] Create Store Success',
    props<{ data: any }>()
);

export const fetchStore = createAction(
    '[Store] Fetch Store',
    props<{ data: any }>()
);

export const fetchStoreSuccess = createAction(
    '[Store] Fetch Store Success',
    props<{ data: any }>()
);

export const emptyStore = createAction(
    '[Store] Empty Store'
);

export const emptyStoreSuccess = createAction(
    '[Store] Empty Store Success'
);
