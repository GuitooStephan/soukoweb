import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const AddCustomerFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'First Name',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-lg-6 col-12 mb-4',
        name: 'first_name',
        placeholder: 'Enter the first name',
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
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'last_name',
        placeholder: 'Enter the last name',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Last name is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Email',
        inputType: 'text',
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'email',
        required: true,
        placeholder: 'Enter the email',
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
        type: 'phone_number',
        label: 'Phone Number',
        inputType: 'text',
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'phone_number',
        placeholder: 'Enter the phone number',
        validations: []
    },
    {
        type: 'date',
        label: 'DOB',
        inputType: 'text',
        wrapper_classes: 'col-12 px-0 mb-1',
        name: 'dob',
        placeholder: 'Enter the date of birth',
        validations: []
    },
    {
        type: 'input',
        label: 'City',
        inputType: 'text',
        wrapper_classes: 'col-lg-6 col-12 mb-4',
        name: 'city',
        placeholder: 'Enter the city',
        validations: []
    },
    {
        type: 'countries',
        label: 'Country',
        wrapper_classes: 'col-lg-6 col-12 mb-4',
        name: 'country',
        placeholder: 'Enter the country',
        validations: []
    },
    {
        type: 'input',
        label: 'Address',
        inputType: 'text',
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'address',
        placeholder: 'Enter the address',
        validations: []
    },
    {
        type: 'input',
        label: 'Other Address Details',
        inputType: 'text',
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'other_address_details',
        placeholder: 'Enter the other address details',
        validations: []
    },
    {
        label: 'Comment',
        type: 'textarea',
        inputType: 'text',
        wrapper_classes: 'col-lg-12 mb-4',
        name: 'comment',
        placeholder: 'Enter your comments',
        validations: []
    }
];
