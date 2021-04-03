import { createAction, props } from '@ngrx/store';

export const addProduct = createAction(
    '[Cart] Add Product',
    props<{ data: any }>()
);

export const removeProduct = createAction(
    '[Cart] Remove Product',
    props<{ data: any }>()
);

export const emptyCart = createAction(
    '[Cart] Empty Cart'
);
