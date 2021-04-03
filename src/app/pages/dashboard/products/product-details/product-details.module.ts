import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { StocksComponent } from './stocks/stocks.component';
import { BuyersComponent } from './buyers/buyers.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddStockComponent } from './add-stock/add-stock.component';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StocksComponent,
    BuyersComponent,
    AddStockComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    NgbModalModule,
    NgbPaginationModule
  ]
})
export class ProductDetailsModule { }
