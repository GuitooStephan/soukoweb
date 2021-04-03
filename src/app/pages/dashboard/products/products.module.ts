import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { NgbDropdownModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  declarations: [
    AddProductComponent,
    ListComponent,
    EditProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    LayoutsModule,
    NgbModalModule,
    AvatarModule,
    FormsModule,
    NgbPaginationModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    MatDialogModule,
    ProductDetailsModule
  ],
  entryComponents: [
    AddProductComponent,
    EditProductComponent
  ]
})
export class ProductsModule { }
