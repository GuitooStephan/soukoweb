import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { InformationComponent } from './information/information.component';
import { BillingComponent } from './billing/billing.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { UpdateLogoComponent } from './update-logo/update-logo.component';


@NgModule({
  declarations: [
    InformationComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AvatarModule,
    MyStoreRoutingModule
  ],
  entryComponents: [
    UpdateLogoComponent
  ]
})
export class MyStoreModule { }
