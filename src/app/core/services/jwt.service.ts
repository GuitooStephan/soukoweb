import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string {
    return window.localStorage.jwtToken || null;
  }

  saveToken(token: string) {
    window.localStorage.jwtToken = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
