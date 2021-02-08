import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DevInfoComponent } from './dev-info/dev-info.component';



@NgModule({
  declarations: [
    SideBarComponent,
    TopBarComponent,
    DevInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    NgbDropdownModule,
    NgbModalModule
  ],
  exports: [
    SideBarComponent,
    TopBarComponent,
    DevInfoComponent
  ]
})
export class LayoutsModule { }
