import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DevInfoComponent } from './dev-info/dev-info.component';
import { AvatarModule } from 'ngx-avatar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SideBarComponent,
    TopBarComponent,
    DevInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    CoreModule,
    AvatarModule,
    ClipboardModule,
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
