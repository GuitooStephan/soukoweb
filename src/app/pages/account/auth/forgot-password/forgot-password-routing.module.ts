import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: '', component: ConfirmEmailComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
