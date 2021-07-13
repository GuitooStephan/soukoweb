import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfilRoutingModule } from './my-profil-routing.module';
import { InformationComponent } from './information/information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    InformationComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MyProfilRoutingModule,
    TranslateModule,
    SharedModule,
    CoreModule
  ]
})
export class MyProfilModule { }
