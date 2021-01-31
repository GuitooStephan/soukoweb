import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: 'sign-up', component: SignupComponent, loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'forgot-password', component: ForgotPasswordComponent, loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'sign-in', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
