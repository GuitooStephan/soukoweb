import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const CreateUserFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'First Name *',
        inputType: 'text',
        wrapper_classes: 'col-12 col-sm-6 col-lg-12 px-0 pr-sm-2 mb-1',
        name: 'first_name',
        placeholder: 'Enter your first name',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'First Name is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Last Name *',
        inputType: 'text',
        wrapper_classes: 'col-12 col-sm-6 col-lg-12 px-0 pl-sm-2 mb-1',
        name: 'last_name',
        placeholder: 'Enter your last name',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Last Name is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Email Address *',
        inputType: 'text',
        wrapper_classes: 'col-12 col-sm-6 col-lg-12 px-0 pr-sm-2 mb-1',
        name: 'email',
        placeholder: 'Enter your email',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Email is required'
            },
            {
                name: 'email',
                validator: Validators.email,
                message: 'Email not valid'
            }
        ]
    },
    {
        type: 'input',
        label: 'Username',
        inputType: 'text',
        wrapper_classes: 'col-12 col-sm-6 col-lg-12 px-0 pl-sm-2 mb-1',
        name: 'username',
        placeholder: 'Enter your username',
        validations: []
    },
    {
        type: 'date',
        label: 'DOB *',
        inputType: 'text',
        wrapper_classes: 'col-md-12 px-0 mb-1',
        name: 'dob',
        placeholder: 'Enter your date of birth',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'DOB is required'
            }
        ]
    },
    {
        label: 'Password *',
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
    },
    {
        type: 'password',
        label: 'Re-Enter Password *',
        inputType: 'password',
        wrapper_classes: 'col-md-12 px-0 mb-1',
        placeholder: 'Confirm your password',
        name: 'confirm_password',
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
    },
    {
        label: 'I accept Souko\'s Terms and Conditions *',
        type: 'checkbox',
        wrapper_classes: 'col-md-12 px-0 mb-1',
        value: true,
        name: 'accept_terms',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'You need to accept the terms'
            }
        ]
    }
];
