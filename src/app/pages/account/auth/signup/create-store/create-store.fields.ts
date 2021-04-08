import { Validators } from '@angular/forms';
import { Categories } from 'src/app/core/common/options/categories.options';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const CreateStoreFields: FieldConfig[] = [
    {
        type: 'file',
        wrapper_classes: 'col-lg-12 px-0',
        name: 'logo_url',
        label: 'Upload Store Logo',
        placeholder: 'Upload store logo',
        validations: []
    },
    {
        type: 'input',
        label: 'Name *',
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
        label: 'Categories *',
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
        label: 'Phone Number *',
        inputType: 'text',
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
        label: 'City *',
        inputType: 'text',
        wrapper_classes: 'col-sm-6 px-0 pl-sm-2 mb-1',
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
        label: 'Country *',
        wrapper_classes: 'col-sm-6 px-0 pl-sm-2 mb-1',
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
        wrapper_classes: 'col-sm-6 px-0 pl-sm-2 mb-1',
        name: 'instagram_handle',
        placeholder: 'Enter your handle',
        validations: []
    },
    {
        type: 'input',
        label: 'Facebook Handle',
        inputType: 'text',
        wrapper_classes: 'col-sm-6 px-0 pl-sm-2 mb-1',
        name: 'facebook_handle',
        placeholder: 'Enter your handle',
        validations: []
    }
];
