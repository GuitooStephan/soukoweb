import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { CreateUserComponent } from './create-user/create-user.component';


const routes: Routes = [
  { path: '', component: CreateUserComponent },
  { path: 'create-store', component: CreateStoreComponent, canActivate: [ AuthGuard ] },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
