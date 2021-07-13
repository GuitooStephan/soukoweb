import { Validators } from '@angular/forms';
import { Categories } from 'src/app/core/common/options/categories.options';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const InformationFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'First Name',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-sm-12 col-lg-6 mb-1',
        name: 'first_name',
        placeholder: 'Enter your first name',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'First name is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Last Name',
        required: true,
        inputType: 'text',
        wrapper_classes: 'col-sm-12 col-lg-6 mb-1',
        name: 'last_name',
        placeholder: 'Enter your last name',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Last name is required'
            }
        ]
    },
    {
        type: 'date',
        label: 'DOB',
        required: true,
        inputType: 'text',
        wrapper_classes: 'col-md-12 mb-1',
        name: 'dob',
        placeholder: 'Enter your date of birth',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'DOB is required'
            }
        ]
    }
];
