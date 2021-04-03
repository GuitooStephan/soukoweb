import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceOrderRoutingModule } from './place-order-routing.module';
import { SelectProductsComponent } from './select-products/select-products.component';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { CoreModule } from 'src/app/core/core.module';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThousandSuffixePipe } from 'src/app/core/pipes/thousand-suffix.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { ConfirmationPromptComponent } from './confirmation-prompt/confirmation-prompt.component';


@NgModule({
  declarations: [
    SelectProductsComponent,
    ProductDetailsComponent,
    ConfirmOrderComponent,
    ConfirmationPromptComponent
  ],
  imports: [
    CommonModule,
    PlaceOrderRoutingModule,
    LayoutsModule,
    SharedModule,
    AvatarModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModalModule,
    FormsModule,
    CoreModule
  ],
  providers: [
    ThousandSuffixePipe
  ],
  entryComponents: [
    ProductDetailsComponent,
    ConfirmOrderComponent
  ]
})
export class PlaceOrderModule { }
