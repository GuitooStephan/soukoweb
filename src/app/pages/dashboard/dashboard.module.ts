import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { MyStoreComponent } from './my-store/my-store.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProfilModule } from './my-profil/my-profil.module';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { AvatarModule } from 'ngx-avatar';
import { UpdateLogoComponent } from './my-store/update-logo/update-logo.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    MyStoreComponent,
    MyProfilComponent,
    UpdateLogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    LayoutsModule,
    NgbDropdownModule,
    FormsModule,
    NgApexchartsModule,
    ProductsModule,
    LayoutsModule,
    NgbModalModule,
    OrdersModule,
    CustomersModule,
    SharedModule,
    CoreModule,
    AvatarModule,
    MyProfilModule
  ],
  entryComponents: [
    UpdateLogoComponent
  ]
})
export class DashboardModule { }
