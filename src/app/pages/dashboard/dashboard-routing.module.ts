import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { MyStoreComponent } from './my-store/my-store.component';


const routes: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: 'my-store', component: MyStoreComponent, loadChildren: () => import('./my-store/my-store.module').then(m => m.MyStoreModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  {
    path: 'my-profile',
    component: MyProfilComponent,
    loadChildren: () => import('./my-profil/my-profil.module').then(m => m.MyProfilModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
