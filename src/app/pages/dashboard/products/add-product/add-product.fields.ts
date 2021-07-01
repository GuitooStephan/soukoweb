import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const AddProductFields: FieldConfig[] = [
    {
        type: 'file',
        wrapper_classes: 'col-lg-12',
        name: 'product_picture_url',
        label: 'Upload Product Picture *',
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
        label: 'Name *',
        inputType: 'text',
        wrapper_classes: 'col-12 mb-4',
        name: 'name',
        placeholder: 'Enter the product name',
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
        wrapper_classes: 'col-lg-12 mb-4',
        name: 'description',
        placeholder: 'Enter the product description',
        validations: []
    },
    {
        type: 'input',
        label: 'Buying/Production Price *',
        inputType: 'text',
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
        label: 'Selling Price *',
        inputType: 'text',
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
    },
    {
        type: 'input',
        label: 'Quantity *',
        inputType: 'text',
        wrapper_classes: 'col-12 mb-4',
        name: 'quantity',
        placeholder: 'Enter the quantity',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Quantity is required'
            },
            {
                name: 'pattern',
                validator: Validators.pattern( /^\d*\.?\d{0,2}$/ ),
                message: 'Quantity should be a number'
            }
        ]
    },
];
