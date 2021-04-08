import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const AddStockFields: FieldConfig[] = [
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
