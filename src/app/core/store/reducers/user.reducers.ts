import {
    createReducer,
    on,
    Action
} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as StoreActions from '../actions/store.actions';


const userReducerConstructor = createReducer(
    null,
    on(AuthActions.createUserSuccess, (state, { data }) => ({ ...data.user })),
    on(AuthActions.updateUserSuccess, (state, { data }) => ({ ...data })),
    on(AuthActions.signInSuccess, (state, { data }) => ({ ...data.user.user })),
    on(AuthActions.signInAlmostDone, (state, { data }) => ({ ...data.user.user })),
    on(StoreActions.emptyStore, (state, { }) => (null)),
    on(AuthActions.signOut, ( state, {} ) => ( null ) ),
);

export function userReducer(state: any | undefined, action: Action): any {
    return userReducerConstructor(state, action);
}
