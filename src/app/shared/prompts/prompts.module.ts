import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPromptComponent } from './confirm-prompt/confirm-prompt.component';
import { InputPromptComponent } from './input-prompt/input-prompt.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ConfirmPromptComponent, InputPromptComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ConfirmPromptComponent,
    InputPromptComponent
  ]
})
export class PromptsModule { }
