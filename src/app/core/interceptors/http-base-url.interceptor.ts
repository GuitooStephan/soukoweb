import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor() {}

    /**
     * Base Url Interceptor
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${environment.base_url}${req.url}` });
        return next.handle(apiReq);
    }

}
