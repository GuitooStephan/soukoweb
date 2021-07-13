import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
    disabled?: boolean;
    label?: string;
    name?: string;
    // Field css classes
    classes?: string;
    // Field wrapper css classes, mostly use to specify width eg. col-12, col-6
    wrapper_classes?: string;
    icon_class?: string;
    inputType?: string;
    options?: Options[];
    min?: number;
    max?: number;
    maxlength?: number;
    collections?: any;
    type?: string;
    value?: any;
    required?: boolean;
    // Validators
    validations?: Validator[];
    placeholder?: string;
}

export interface Validator {
    // Validor name
    name: string;
    // Validor from @angular/forms
    validator?: ValidatorFn;
    // Error message
    message: string;
}

export interface Options {
    label: string;
    value: string;
}

