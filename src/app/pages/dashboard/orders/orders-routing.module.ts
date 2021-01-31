import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ListComponent } from './list/list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'create', component: AddOrderComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditOrderComponent },
  { path: ':id', component: OrderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
