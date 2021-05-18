import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { NgbAccordionModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqsComponent } from './faqs/faqs.component';


@NgModule({
  declarations: [
    HomeComponent,
    FaqsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LandingRoutingModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbNavModule,
    NgbAccordionModule,
    CountdownModule
  ]
})
export class LandingModule { }
