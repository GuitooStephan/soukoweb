import {
    createReducer,
    on,
    Action
} from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

declare var _;

const cartReducerConstructor = createReducer(
    [],
    on(CartActions.addProduct, (state, { data }) => ([ ...state, data ])),
    on(CartActions.removeProduct, (state, { data }) => ([ ..._.filter( state, s => s.product.id !== data.id  ) ])),
    on(CartActions.emptyCart, ( state, {} ) => ( [] ) ),
);

export function cartReducer(state: any | undefined, action: Action): any {
    return cartReducerConstructor(state, action);
}
