import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


const routes: Routes = [
  {
    path: 'place-order',
    component: PlaceOrderComponent,
    loadChildren: () => import('./place-order/place-order.module').then(m => m.PlaceOrderModule)
  },
  {
    path: 'confirm-order',
    component: ConfirmOrderComponent,
    loadChildren: () => import('./confirm-order/confirm-order.module').then(m => m.ConfirmOrderModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }
