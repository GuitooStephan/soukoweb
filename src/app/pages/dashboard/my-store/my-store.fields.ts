import { Validators } from '@angular/forms';
import { Categories } from 'src/app/core/common/options/categories.options';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const MyStoreFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'Name',
        required: true,
        inputType: 'text',
        wrapper_classes: 'col-sm-12 px-0 pr-sm-2 mb-1',
        name: 'name',
        placeholder: 'Enter your name',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Name is required'
            }
        ]
    },
    {
        type: 'multiselect',
        label: 'Categories',
        required: true,
        wrapper_classes: 'col-md-12 px-0',
        name: 'categories_ids',
        options: Categories,
        placeholder: 'Choose Categories',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Categories is required'
            }
        ]
    },
    {
        type: 'phone_number',
        label: 'Phone Number',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-sm-12 px-0 pr-sm-2 mb-1',
        name: 'phone_number',
        placeholder: 'Enter your phone number',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Phone Number is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'City',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-12 col-lg-6 px-0 pl-sm-2 mb-1',
        name: 'city',
        placeholder: 'Enter your city',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'City is required'
            }
        ]
    },
    {
        type: 'countries',
        label: 'Country',
        required: true,
        wrapper_classes: 'col-12 col-lg-6 px-0 pl-sm-2 mb-1',
        name: 'country',
        placeholder: 'Enter your country',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Country is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Instagram Handle',
        inputType: 'text',
        wrapper_classes: 'col-12 col-lg-6 px-0 pl-sm-2 mb-1',
        name: 'instagram_handle',
        placeholder: 'Enter your handle',
        validations: []
    },
    {
        type: 'input',
        label: 'Facebook Handle',
        inputType: 'text',
        wrapper_classes: 'col-12 col-lg-6 px-0 pl-sm-2 mb-1',
        name: 'facebook_handle',
        placeholder: 'Enter your handle',
        validations: []
    }
];
