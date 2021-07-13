import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { AddOrderComponent } from './add-order/add-order.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListComponent } from './list/list.component';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RecordPaymentComponent } from './record-payment/record-payment.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AddOrderComponent,
    ListComponent,
    EditOrderComponent,
    OrderDetailsComponent,
    RecordPaymentComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CoreModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgbDropdownModule,
    NgbPaginationModule,
    OrderDetailsModule,
    MatProgressBarModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class OrdersModule { }
