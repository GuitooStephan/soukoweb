import {
    createReducer,
    on,
    Action
} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as ErrorActions from '../actions/error.actions';
import * as LoadingActions from '../actions/loading.actions';
import * as StoreActions from '../actions/store.actions';


const loadingReducerConstructor = createReducer(
    false,
    on(LoadingActions.showLoader, (state, { }) => (true)),
    on(LoadingActions.hideLoader, (state, { }) => (false)),

    on(AuthActions.createUser, (state, { }) => (true)),
    on(AuthActions.createUserSuccess, (state, { }) => (false)),

    on(AuthActions.updateUser, (state, { }) => (true)),
    on(AuthActions.updateUserSuccess, (state, { }) => (false)),

    on(AuthActions.signIn, (state, { }) => (true)),
    on(AuthActions.signInSuccess, (state, { }) => (false)),

    on(StoreActions.createStore, (state, { }) => (true)),
    on(StoreActions.createStoreSuccess, (state, { }) => (false)),

    on(StoreActions.emptyStore, (state, { }) => (false)),
    on( AuthActions.signOut, ( state, {} ) => ( false ) ),

    on(ErrorActions.loadError, (state, { }) => (false)),
);

export function loadingReducer(state: boolean | undefined, action: Action): boolean {
    return loadingReducerConstructor(state, action);
}
