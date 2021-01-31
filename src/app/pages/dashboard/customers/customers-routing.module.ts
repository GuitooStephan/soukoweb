import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: ListComponent  },
  {
    path: ':id',
    component: CustomerDetailsComponent,
    loadChildren: () => import('./customer-details/customer-details.module').then(m => m.CustomerDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
