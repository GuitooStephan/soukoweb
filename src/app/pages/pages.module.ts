import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { LandingModule } from './landing/landing.module';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AccountModule,
    DashboardModule,
    LayoutsModule,
    CustomerDashboardModule,
    LandingModule
  ]
})
export class PagesModule { }
