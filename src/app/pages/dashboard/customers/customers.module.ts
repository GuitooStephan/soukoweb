import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListComponent } from './list/list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from 'src/app/core/core.module';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsModule } from './customer-details/customer-details.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


@NgModule({
  declarations: [
    ListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatDialogModule,
    CoreModule,
    SharedModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    CustomerDetailsModule
  ]
})
export class CustomersModule { }
