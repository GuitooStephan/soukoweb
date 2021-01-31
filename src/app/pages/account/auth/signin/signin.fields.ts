import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const SignInFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'Email',
        inputType: 'text',
        wrapper_classes: 'col-sm-12 px-0 pr-sm-2 mb-1',
        name: 'email',
        placeholder: 'Enter your email',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Email is required'
            }
        ]
    },
    {
        label: 'Password',
        type: 'password',
        inputType: 'password',
        wrapper_classes: 'col-md-12 px-0 mb-1',
        name: 'password',
        placeholder: 'Enter your password',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Password is required'
            }
        ]
    }
];
