import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyersComponent } from './buyers/buyers.component';
import { StocksComponent } from './stocks/stocks.component';


const routes: Routes = [
  { path: '', redirectTo: 'stocks', pathMatch: 'full' },
  { path: 'stocks', component: StocksComponent },
  { path: 'buyers', component: BuyersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
