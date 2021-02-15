import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { JwtService } from '../../services/jwt.service';
import * as AuthActions from '../actions/auth.actions';
import * as ErrorActions from '../actions/error.actions';
import { exhaustMap, catchError, map, first, last } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/root.reducers';
// import { UserService } from '../../services/user.service';


@Injectable()
export class AuthEffects {
    createUsers$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.createUser),
                exhaustMap(
                    action => {
                        return this.authService.createUser(action.data.payload).pipe(
                            map(user => {
                                this.router.navigate(['/account/auth/sign-up/create-store']);
                                return AuthActions.createUserSuccess({ data: user });
                            }),
                            catchError(err => of(ErrorActions.loadError({ error: err })))
                        );
                    }
                )
            );
        }
    );

    updateUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType( AuthActions.updateUser ),
                exhaustMap(
                    action => {
                        return this.authService.updateUser( action.data.userId, action.data.payload ).pipe(
                            map( user => {
                                return AuthActions.updateUserSuccess( { data: user } );
                            } ),
                            catchError(err => of(ErrorActions.loadError({ error: err })))
                        );
                    }
                )
            );
        }
    );

    signIn$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.signIn),
                exhaustMap(
                    action => {
                        return this.authService.signIn(action.data.payload).pipe(
                            map(user => {
                                if ( !user.user.is_onboarded ) {
                                    this.router.navigate( ['/account/auth/sign-up/create-store'] );
                                    return AuthActions.signInIncomplete();
                                }

                                if ( !user.user.is_email_confirmed ) {
                                    this.notificationService.error( null, 'Kindly confirm your email.' )
                                    return AuthActions.signInIncomplete();
                                }

                                this.router.navigateByUrl( action.data.returnUrl );
                                return AuthActions.signInSuccess({ data: { user, storeId: user.user.admin.store_id } });
                            }),
                            catchError(err => of(ErrorActions.loadError({ error: err })))
                        );
                    }
                )
            );
        }
    );

    signOut$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.signOut),
                exhaustMap(
                    () => {
                        this.authService.logout();
                        this.router.navigateByUrl('/account/auth/sign-in');
                        return of( AuthActions.signOutSuccess() );
                    }
                )
            );
        }
    );


    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private notificationService: NotificationService,
        private jwtService: JwtService,
        private router: Router
    ) { }

}
