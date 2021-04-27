import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { InformationComponent } from './information/information.component';


const routes: Routes = [
  { path: '', redirectTo: 'information', pathMatch: 'full' },
  { path: 'information', component: InformationComponent },
  { path: 'billing', component: BillingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStoreRoutingModule { }
