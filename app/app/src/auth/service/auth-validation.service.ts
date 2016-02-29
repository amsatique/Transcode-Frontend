import {Injectable} from 'angular2/core';

@Injectable()
export class AuthValidationService {

    /**
     * Get the error message
     *
     * @param code - The error code
     * @returns string - The error message
     */
    public getErrorMessage(code: string): string {
        let config = {
            required: 'Required',
            invalidEmail: 'Invalid email address',
            invalidPassword: 'Password must be at least 6 characters'
        };

        return config[code];
    }

    /**
     * Check the email syntax
     *
     * @param control - Observed input
     * @returns {{invalidEmail: boolean}} - If there are an error
     */
    public emailValidator(control: control): Object {
        let emailRegex = new RegExp(''
                + /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@/.source
                + /(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]/.source
                + /(?:[a-z0-9-]*[a-z0-9])?/.source
            );

        let validEmail = control
            .value
            .match(emailRegex);

        return validEmail ? null : {'invalidEmail': true};
    }

    /**
     * Check the password syntax
     *
     * @param control - Observed input
     * @returns {{invalidPassword: boolean}} - If there are an error
     */
    public passwordValidator(control: control): Object {
        return control.value.length >= 6 ? null : {'invalidPassword': true};
    }

}