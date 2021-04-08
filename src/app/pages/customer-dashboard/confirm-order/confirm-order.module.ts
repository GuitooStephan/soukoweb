import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmOrderRoutingModule } from './confirm-order-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { AvatarModule } from 'ngx-avatar';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';


@NgModule({
  declarations: [
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    CommonModule,
    ConfirmOrderRoutingModule,
    CoreModule,
    SharedModule,
    LayoutsModule,
    AvatarModule
  ]
})
export class ConfirmOrderModule { }