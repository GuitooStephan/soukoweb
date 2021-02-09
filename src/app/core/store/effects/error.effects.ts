import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '../../services/notification.service';
import * as ErrorActions from '../actions/error.actions';
import * as AuthActions from '../actions/auth.actions';
import { exhaustMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AppConstant } from '../../constants/app.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '../reducers/root.reducers';
import { Store, select } from '@ngrx/store';

declare var _: any;

@Injectable()
export class ErrorEffects {
    error$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ErrorActions.loadError),
                exhaustMap(
                    action => {
                        if (navigator.onLine) {
                            this.handleError(action.error);
                        } else {
                            this.notificationService.error(false, AppConstant.OFFLINE);
                        }
                        return of(ErrorActions.loadErrorSuccess());
                    }
                )
            );
        }
    );

    handleError(error: HttpErrorResponse) {
        let errorMessage = null;
        if (error.status === 400) {
            errorMessage = { message: error.error };
            // let err = error.error.message;
            // (err != null) ? err = err : err = 'There was an error whiles trying to make your request. Please try again';
        } else if (error.status === 401) {
            this.store.dispatch(AuthActions.signOut());
            // this.notify.dialogWarning(`${error.status} - ${JSON.stringify(error.error.message)} `);
            errorMessage = { message: 'User token has expired.' };
        } else if (error.status === 500) {
            this.notificationService.error( null, 'Error occured. Kindly retry or contact our team for assistance if error persists.' )
            this.handleServerError(error);
        } else {
            errorMessage = throwError(error.error);
            // return 'Your session has expired, Log back in to continue using the Dashboard';
            // tslint:disable-next-line:max-line-length
            // this.notify.dialogInfo(`${error.status} - ${JSON.stringify(error.error.message)} \n Your session has expired, Log back in to continue using the Dashboard`);
        }
        return throwError(errorMessage);
    }

    handleServerError(error: HttpErrorResponse) {
        // this.notify.dialogError(`Server Error Code: ${error.status}\nMessage: ${error.message}`);
        return `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }


    constructor(
        private actions$: Actions,
        private notificationService: NotificationService,
        private store: Store<AppState>
    ) { }

}
