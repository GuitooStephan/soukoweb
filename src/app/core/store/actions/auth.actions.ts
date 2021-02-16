import { createAction, props } from '@ngrx/store';

export const createUser = createAction(
    '[Auth] Create Users',
    props<{ data: any }>()
);

export const createUserSuccess = createAction(
    '[Auth] Create Users Success',
    props<{ data: any }>()
);

export const updateUser = createAction(
    '[Auth] Update Users',
    props<{ data: any }>()
);

export const updateUserSuccess = createAction(
    '[Auth] Update Users Success',
    props<{ data: any }>()
);

export const signIn = createAction(
    '[Auth] Sign In',
    props<{ data: any }>()
);

export const signInSuccess = createAction(
    '[Auth] Sign In Success',
    props<{ data: any }>()
);

export const signInIncomplete = createAction(
    '[Auth] Sign In Incomplete'
);

export const signOut = createAction(
    '[Auth] Sign Out'
);

export const signOutSuccess = createAction(
    '[Auth] Sign Out Success'
);


