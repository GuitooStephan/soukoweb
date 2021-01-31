import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPromptComponent } from './confirm-prompt/confirm-prompt.component';
import { InputPromptComponent } from './input-prompt/input-prompt.component';



@NgModule({
  declarations: [ConfirmPromptComponent, InputPromptComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ConfirmPromptComponent,
    InputPromptComponent
  ]
})
export class PromptsModule { }
