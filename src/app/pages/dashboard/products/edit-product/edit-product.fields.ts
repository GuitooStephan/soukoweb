import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const EditProductFields: FieldConfig[] = [
    {
        type: 'file',
        wrapper_classes: 'col-lg-12 px-0',
        name: 'product_picture_url',
        label: 'Product Picture',
        required: true,
        placeholder: 'Upload product picture',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Picture is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Name',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-12 mb-4',
        name: 'name',
        placeholder: 'Enter the product description',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Name is required'
            }
        ]
    },
    {
        label: 'Description',
        type: 'textarea',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-lg-12 mb-4',
        name: 'description',
        placeholder: 'Enter the product description',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Description is required'
            }
        ]
    },
    {
        type: 'input',
        label: 'Buying/Production Price',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'buying_price',
        placeholder: 'Enter the buying price',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Buying price is required'
            },
            {
                name: 'pattern',
                validator: Validators.pattern( /^\d*\.?\d{0,2}$/ ),
                message: 'Buying price should be a number'
            }
        ]
    },
    {
        type: 'input',
        label: 'Selling Price',
        inputType: 'text',
        required: true,
        wrapper_classes: 'col-12 col-lg-6 mb-4',
        name: 'selling_price',
        placeholder: 'Enter the selling price',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Selling price is required'
            },
            {
                name: 'pattern',
                validator: Validators.pattern( /^\d*\.?\d{0,2}$/ ),
                message: 'Selling price should be a number'
            }
        ]
    }
];
