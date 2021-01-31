import {
    createReducer,
    on,
    Action
} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as StoreActions from '../actions/store.actions';


const storeReducerConstructor = createReducer(
    null,
    on(StoreActions.createStoreSuccess, (state, { data }) => ({ ...data })),
    on(StoreActions.fetchStoreSuccess, (state, { data }) => ({ ...data })),
    on(AuthActions.signOut, ( state, {} ) => ( null ) ),
);

export function storeReducer(state: any | undefined, action: Action): any {
    return storeReducerConstructor(state, action);
}
