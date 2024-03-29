import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const ChangePasswordFields: FieldConfig[] = [
    {
        type: 'password',
        label: 'Old Password',
        inputType: 'password',
        required: true,
        wrapper_classes: 'col-12 px-0 mr-lg-1',
        name: 'old_password',
        placeholder: 'Enter your old password',
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
        label: 'New Password',
        inputType: 'password',
        required: true,
        wrapper_classes: 'col-12 px-0',
        name: 'new_password',
        placeholder: 'Enter your new password',
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
        required: true,
        wrapper_classes: 'col-12 px-0',
        name: 'confirm_new_password',
        placeholder: 'Confirm your new password',
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