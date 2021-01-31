import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const ResetPasswordFields: FieldConfig[] = [
    {
        type: 'password',
        label: 'New Password',
        inputType: 'password',
        wrapper_classes: 'col-sm-12 px-0 mb-1',
        name: 'password',
        placeholder: '',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Password is required'
            }
        ]
    },
    {
        type: 'password',
        label: 'Re-Enter Password',
        inputType: 'password',
        wrapper_classes: 'col-sm-12 px-0 mb-1',
        name: 'confirm_password',
        placeholder: '',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Password is required'
            },
            {
                name: 'incorrect',
                validator: Validators.nullValidator,
                message: 'Passwords do not match'
            }
        ]
    }
];
