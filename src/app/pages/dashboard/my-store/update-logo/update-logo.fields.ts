import { Validators } from '@angular/forms';
import { Categories } from 'src/app/core/common/options/categories.options';
import { FieldConfig } from 'src/app/shared/dynamic-forms/field.interface';

export const UpdateLogoFields: FieldConfig[] = [
    {
        type: 'file',
        wrapper_classes: 'col-lg-12 px-0',
        name: 'logo_url',
        label: 'Upload Store Logo *',
        placeholder: 'Upload store logo',
        validations: [
            {
                name: 'required',
                validator: Validators.required,
                message: 'Logo is required'
            }
        ]
    }
];
