import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JwtService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * Set Headers for all requests
     */
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    /**
     * Gets token from JwtService after user is authenticated
     */
    const token = this.jwtService.getToken();
    if ( token ) {
      req = req.clone({ headers: req.headers.set('Authorization', `Token ${token}`) });
    }
    return next.handle(req);
  }

}
