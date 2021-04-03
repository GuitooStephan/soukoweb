import { Directive, OnInit, OnChanges, ComponentFactoryResolver, Input, ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { PasswordComponent } from '../password/password.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DateComponent } from '../date/date.component';
import { SelectComponent } from '../select/select.component';
import { CountriesComponent } from '../countries/countries.component';
import { MultipleSelectComponent } from '../multiple-select/multiple-select.component';
import { IntPhoneNumberComponent } from '../int-phone-number/int-phone-number.component';
import { FileComponent } from '../file/file.component';

const componentMapper = {
  input: InputComponent,
  date: DateComponent,
  countries: CountriesComponent,
  multiselect: MultipleSelectComponent,
  phone_number: IntPhoneNumberComponent,
  select: SelectComponent,
  file: FileComponent,
  checkbox: CheckboxComponent,
  textarea: TextAreaComponent,
  password: PasswordComponent
};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {

  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

  ngOnChanges() {
    if (this.componentRef) {
      this.componentRef.instance.config = this.field;
      this.componentRef.instance.group = this.group;
    }
  }

}
