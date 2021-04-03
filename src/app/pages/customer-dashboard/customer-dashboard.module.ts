import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { PlaceOrderModule } from './place-order/place-order.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ConfirmOrderModule } from './confirm-order/confirm-order.module';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';


@NgModule({
  declarations: [
    PlaceOrderComponent,
    ConfirmOrderComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    PlaceOrderModule,
    ConfirmOrderModule
  ]
})
export class CustomerDashboardModule { }
