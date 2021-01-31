import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const ForgotPasswordFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'Email Address',
        inputType: 'text',
        wrapper_classes: 'col-sm-12 px-0 pr-sm-2 mb-1',
        name: 'email',
        placeholder: 'Enter your email',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Email is required'
            },
            {
                name: 'patterns',
                validator: Validators.email,
                message: 'Email not valid'
            }
        ]
    }
];
