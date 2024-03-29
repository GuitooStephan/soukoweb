import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CreateUserComponent,
    CreateStoreComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    LayoutsModule,
    SignupRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class SignupModule { }
