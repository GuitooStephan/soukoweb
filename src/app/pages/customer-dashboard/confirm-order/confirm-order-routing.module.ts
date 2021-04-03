import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmOrderComponent } from './confirm-order.component';
import { FailureComponent } from './failure/failure.component';
import { SuccessComponent } from './success/success.component';


const routes: Routes = [
  {
    path: ':id/success',
    component: SuccessComponent
  },
  {
    path: ':id/failure',
    component: FailureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmOrderRoutingModule { }
