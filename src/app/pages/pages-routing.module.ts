import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenUnauthGuard } from '../core/guards/childen-unauth.guard';
import { ChildrenAuthGuard } from '../core/guards/children-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  // tslint:disable-next-line: max-line-length
  { path: '', component: LandingComponent, canActivateChild: [ ChildrenUnauthGuard ], loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'dashboard', component: DashboardComponent, canActivateChild: [ ChildrenAuthGuard ], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'customer', loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
