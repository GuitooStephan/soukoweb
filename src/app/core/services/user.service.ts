import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private apiService: ApiService
    ) { }

    forgotPassword(payload): Observable<any> {
        return this.apiService.post(`reset_password/`, payload);
    }

    resetPassword(payload): Observable<any> {
        return this.apiService.post(`reset_password/confirm/`, payload);
    }

    changePassword( payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.USERS_URL}me/change-password/`, payload );
    }

    resendVerificationEmail( payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.USERS_URL}resend-verification-code/`, payload );
    }

}
