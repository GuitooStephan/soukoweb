import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { PasswordComponent } from './password/password.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SelectComponent } from './select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountriesComponent } from './countries/countries.component';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { IntPhoneNumberComponent } from './int-phone-number/int-phone-number.component';


@NgModule({
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
    PasswordComponent,
    CheckboxComponent,
    DateComponent,
    SelectComponent,
    CountriesComponent,
    MultipleSelectComponent,
    IntPhoneNumberComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgSelectModule,
    NgxIntlTelInputModule
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    TextAreaComponent,
    PasswordComponent
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormsModule { }
