import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any | null;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  createUser(payload): Observable<any> {
    return this.apiService.post(`${ApiConstants.USERS_URL}`, payload)
      .pipe(
        map(data => {
          this.jwtService.saveToken(data.token);
          return data;
        })
      );
  }

  updateUser(userId, payload): Observable<any> {
    return this.apiService.put(`${ApiConstants.USERS_URL}${userId}/`, payload)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  signIn(payload): Observable<any> {
    return this.apiService.post(`${ApiConstants.USERS_URL}login/`, payload)
      .pipe(
        map(data => {
          if ( data.user.is_email_confirmed ) {
            this.jwtService.saveToken(data.token);
          }
          return data;
        })
      );
  }

  /**
   * Logout the user
   */
  logout() {
    this.jwtService.destroyToken();
    this.user = null;
  }

}
