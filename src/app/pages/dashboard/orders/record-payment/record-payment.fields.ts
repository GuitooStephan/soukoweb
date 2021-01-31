import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const RecordPaymentFields: FieldConfig[] = [
    {
        type: 'input',
        label: 'Amount',
        inputType: 'text',
        wrapper_classes: 'col-12 mb-4',
        name: 'amount',
        placeholder: 'Enter the amount',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Amount is required'
            },
            {
                name: 'pattern',
                validator: Validators.pattern( /^\d*\.?\d{0,2}$/ ),
                message: 'Amount should be a number'
            }
        ]
    },
];
