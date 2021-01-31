import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InformationComponent } from './information/information.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'information' },
  { path: 'information', component: InformationComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfilRoutingModule { }
