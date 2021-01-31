import { Validators } from '@angular/forms';

export class ValidationConstants {
    public static EMAIL_REGEX = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/;
    // tslint:disable-next-line: max-line-length
    public static PASSWORD_REGEX = /(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.{8,}/;
}

export const PasswordValidators = [
    {
        name : 'required',
        validator : Validators.required,
        message : 'Field is required'
    },
    {
        name : 'minlength',
        validator : Validators.minLength(8),
        message : 'Input must exceed 8 characters'
    },
    {
        name : 'pattern',
        validator : Validators.pattern(
            ValidationConstants.PASSWORD_REGEX
        ),
        // tslint:disable-next-line: max-line-length
        message : 'Input must include 3 of the 4 items : An upper case letter, a lower case letter, a numerical character and a special character'
    }
];

