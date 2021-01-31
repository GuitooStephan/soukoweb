import { Component, OnInit, OnChanges, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig, Validator } from '../field.interface';
import { ValidatorFn, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() name?: string;
  @Input() fields?: FieldConfig[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Input() formClasses = '';
  @Input() groupValidator: ValidatorFn = Validators.nullValidator;
  form: FormGroup;
  loading = false;

  get controls() { return this.fields.filter(({ type }) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.prefill(JSON.parse(window.localStorage.getItem(this.name)));
  }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls.filter((control) => !configControls.includes(control)).forEach((control) => {
        this.form.removeControl(control);
      });

      configControls.filter((control) => !controls.includes(control)).forEach((name) => {
          const config = this.fields.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup() {
    const group = this.fb.group({});
    let fields: FieldConfig[];
    if (this.fields != null) {
      fields = this.fields.filter(field => field.type !== 'button');
      fields.forEach(control => group.addControl(control.name, this.createControl(control)));
      group.setValidators(this.groupValidator);
      return group;
    }
  }

  addNewControl(field: FieldConfig) {
    this.form.addControl(field.name, this.createControl(field));
  }

  removeControl(fieldName) {
    if (this.form.get(fieldName)) {
      this.form.removeControl(fieldName);
    }
  }

  createControl(config: FieldConfig) {
    const { disabled, value } = config;
    const validations = this.getValidators(config.validations || []);
    return this.fb.control({ disabled, value }, validations);
  }

  private getValidators(validations: Validator[]) {
    if (validations.length > 0) {
      const validators = validations.map(({ validator }) => validator);
      return validators;
    }
    return null;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields();
    }
  }

  getValue() {
    if (this.form.valid) {
      return this.form.value;
    } else {
      this.validateAllFormFields();
      return null;
    }
  }

  validateAllFormFields() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.fields = this.fields.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  save() {
    window.localStorage.setItem(this.name, JSON.stringify(this.value));
  }

  removeFormFromStorage() {
    window.localStorage.removeItem(this.name);
  }

  setFormControlValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  reset() {
    this.form.reset();
  }

  valueChanges(): Observable<any> {
    return this.form.valueChanges;
  }

  fieldValueChanges( name ): Observable<any> {
    return this.form.controls[name].valueChanges;
  }

  getFieldValue( name ): any {
    return this.form.get( name ).value;
  }

  prefill(value: any = null) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  setValue(value) {
    this.form.patchValue(value);
  }

  addFieldToControl(config) {
    this.fb.group({}).addControl(config.name, this.createControl(config));
    this.createGroup();
  }

}
