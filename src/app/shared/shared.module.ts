import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormsModule } from './dynamic-forms/dynamic-forms.module';
import { DynamicFormComponent } from './dynamic-forms/dynamic-form/dynamic-form.component';
import { LayoutsModule } from './layouts/layouts.module';
import { PromptsModule } from './prompts/prompts.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicFormsModule,
    LayoutsModule,
    PromptsModule,
    TranslateModule
  ],
  exports: [
    DynamicFormComponent,
  ]
})
export class SharedModule { }
