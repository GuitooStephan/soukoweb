import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupModule } from './signup/signup.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    SignupModule,
    LayoutsModule,
    SharedModule,
    CoreModule,
    ForgotPasswordModule
  ]
})
export class AuthModule { }
