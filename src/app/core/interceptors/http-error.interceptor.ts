import { Injectable, Injector, isDevMode } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppState } from '../store/reducers/root.reducers';
import { Store } from '@ngrx/store';
import { loadError } from '../store/actions/error.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              if (error instanceof HttpErrorResponse) {
                this.store.dispatch( loadError( { error } ) );
              }
              return throwError(error);
            })
        );
    }

}
