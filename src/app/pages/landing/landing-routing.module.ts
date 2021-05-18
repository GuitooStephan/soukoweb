import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faqs', component: FaqsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
