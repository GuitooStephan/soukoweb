import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AppState } from '../store/reducers/root.reducers';
import { Store } from '@ngrx/store';
import * as StoreActions from '../store/actions/store.actions';
import { JwtService } from '../services/jwt.service';

@Injectable({
    providedIn: 'root',
})
export class ChildrenAuthGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private jwtService: JwtService,
        private store: Store<AppState>
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.jwtService.getToken()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.store.dispatch( StoreActions.emptyStore() );
        this.router.navigate(['/account/auth/sign-in'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
