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
        let errors = _.values(error.error);
        (errors.length) ? errors = errors : errors[0] = ['There was an error whiles trying to make your request. Please try again'];
        if (error.status === 400) {
            errors.forEach( e => this.notificationService.error(false, e) );
        } else if (error.status === 401) {
            this.store.dispatch(AuthActions.signOut());
            this.notificationService.error( null, error.error.detail);
        } else if (error.status === 500) {
            this.notificationService.error( null, 'Error occured. Kindly retry or contact our team for assistance if error persists.' );
            this.handleServerError(error);
        }
        return throwError(error);
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
