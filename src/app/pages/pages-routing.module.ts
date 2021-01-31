import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenAuthGuard } from '../core/guards/children-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivateChild: [ ChildrenAuthGuard ], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
