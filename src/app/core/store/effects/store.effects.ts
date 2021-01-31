import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '../../services/notification.service';
import { JwtService } from '../../services/jwt.service';
import * as StoreActions from '../actions/store.actions';
import * as AuthActions from '../actions/auth.actions';
import * as ErrorActions from '../actions/error.actions';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/root.reducers';
import { StoreService } from '../../services/store.service';
// import { UserService } from '../../services/user.service';


@Injectable()
export class StoreEffects {
    createStore$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(StoreActions.createStore),
                exhaustMap(
                    action => {
                        return this.storeService.createStore(action.data.payload).pipe(
                            map(store => {
                                this.router.navigate(['/account/auth/sign-up/confirmation']);
                                return StoreActions.createStoreSuccess({ data: store });
                            }),
                            catchError(err => of(ErrorActions.loadError({ error: err })))
                        );
                    }
                )
            );
        }
    );

    fetchStore$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.signInSuccess, StoreActions.fetchStore),
                exhaustMap(
                    action => {
                        return this.storeService.fetchStore(action.data.storeId).pipe(
                            map(store => {
                                return StoreActions.fetchStoreSuccess({ data: store });
                            }),
                            catchError(err => of(ErrorActions.loadError({ error: err })))
                        );
                    }
                )
            );
        }
    );


    constructor(
        private actions$: Actions,
        private storeService: StoreService,
        private store: Store<AppState>,
        private notificationService: NotificationService,
        private jwtService: JwtService,
        private router: Router
    ) { }

}
