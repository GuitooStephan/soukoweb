import {
    createReducer,
    on,
    Action
} from '@ngrx/store';
import * as ErrorActions from '../actions/error.actions';
import * as AuthActions from '../actions/auth.actions';
import * as StoreActions from '../actions/store.actions';


const errorReducerConstructor = createReducer(
    null,
    on( ErrorActions.loadError, ( state, { error } ) => ( error ) ),
    on( ErrorActions.clearError, ( state, {} ) => ( null ) ),

    on( AuthActions.createUserSuccess, ( state, {} ) => ( null ) ),
    on( AuthActions.updateUserSuccess, ( state, {} ) => ( null ) ),
    on( AuthActions.signInSuccess, ( state, {} ) => ( null ) ),
    on( StoreActions.createStoreSuccess, ( state, {} ) => ( null ) ),
    on( AuthActions.signOut, ( state, {} ) => ( null ) ),
    on( StoreActions.emptyStore, ( state, {} ) => ( null ) ),
);

export function errorReducer(state: any | null, action: Action): any {
    return errorReducerConstructor( state, action );
}

