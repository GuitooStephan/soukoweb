import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ConfirmEmailComponent,
    ConfirmationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class ForgotPasswordModule { }
