import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationPromptComponent } from './confirmation-prompt/confirmation-prompt.component';
import { SelectProductsComponent } from './select-products/select-products.component';


const routes: Routes = [
  {
    path: ':id', redirectTo: ':id/select-products',
    pathMatch: 'full'
  },
  {
    path: ':id/select-products',
    component: SelectProductsComponent
  },
  {
    path: ':id/confirmation-prompt/:orderId',
    component: ConfirmationPromptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceOrderRoutingModule { }
