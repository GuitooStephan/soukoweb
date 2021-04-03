import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { InformationComponent } from './information/information.component';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    ProductsComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    CustomerDetailsRoutingModule,
    NgbPaginationModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FormsModule
  ]
})
export class CustomerDetailsModule { }
