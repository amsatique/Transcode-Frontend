import {Component, Host} from 'angular2/core';
import {AuthValidationService} from "app/src/auth/service/auth-validation.service";
import {NgFormModel} from "angular2/common";

@Component({
    selector: 'auth-messages',
    inputs: ['_controlName: control'],
    templateUrl : 'app/src/auth/template/auth-messages.component.html',
    providers: [AuthValidationService]
})
export class AuthMessagesComponent {

    @Host()
    private _formDir: NgFormModel;
    private _controlName: string;
    private _authValidationService: AuthValidationService;

    constructor(
        authValidationService: AuthValidationService,
        formDir: NgFormModel) {

        this._formDir = formDir;
        this._authValidationService = authValidationService;
    }

    /**
     * Get error messages for auth form fields
     *
     * @returns {string} - the error message
     */
    get errorMessage(): string {
        let input = this._formDir.form.find(this._controlName);

        for (let property in input.errors) {
            if (input.errors.hasOwnProperty(property) && input.touched) {
                return this._authValidationService.getErrorMessage(property);
            }
        }
    }
}