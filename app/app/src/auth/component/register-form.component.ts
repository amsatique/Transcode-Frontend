import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {AuthValidationService} from 'app/src/auth/service/auth-validation.service';
import {AuthService} from 'app/src/auth/service/auth.service';
import {AuthMessagesComponent} from 'app/src/auth/component/auth-messages.component';
import {Router} from 'angular2/router';

@Component({
    selector: 'register-form',
    templateUrl: 'app/src/auth/template/register-form.component.html',
    providers: [AuthValidationService, AuthService],
    directives: [AuthMessagesComponent]
})
export class RegisterFormComponent {
    private _registerForm: ControlGroup;
    private _authService: AuthService;
    private _registerErrors: string;
    private _router: Router;

    constructor(
        formBuilder: FormBuilder,
        authValidationService: AuthValidationService,
        authService: AuthService,
        router: Router) {

        this._registerForm = formBuilder.group({
            'email': [
                '',
                Validators.compose([
                    Validators.required,
                    authValidationService.emailValidator
                ])],
            'password': [
                '',
                Validators.compose([
                    Validators.required,
                    authValidationService.passwordValidator
                ])]
        });
        this._router = router;
        this._authService = authService;
    }

    /**
     * Signup the user
     */
    public signUp(): void {
        let email = this._registerForm.value.email;
        let password = this._registerForm.value.password;

        this._authService.signUp(email, password)
            .subscribe(
                res => {
                    if (res.json().token) {
                        localStorage.setItem('token', res.json().token);
                        this._router.parent.navigate(['Home']);
                    } else {
                        this._registerErrors = 'An error has occured';
                    }
                },
                err => {
                    let body = JSON.parse(err._body);
                    if (body.message) {
                        this._registerErrors = body.message;
                    } else {
                        this._registerErrors = 'An error has occured';
                    }
                }
            );
    }
}