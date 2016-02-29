import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {AuthValidationService} from 'app/src/auth/service/auth-validation.service';
import {AuthService} from 'app/src/auth/service/auth.service';
import {AuthMessagesComponent} from 'app/src/auth/component/auth-messages.component';
import {Router} from 'angular2/router';

@Component({
    selector: 'login-form',
    templateUrl: 'app/src/auth/template/login-form.component.html',
    providers: [AuthValidationService, AuthService],
    directives: [AuthMessagesComponent]
})
export class LoginFormComponent {

    private _loginForm: ControlGroup;
    private _authService: AuthService;
    private _router: Router;
    private _loginErrors: string;

    constructor(
        formBuilder: FormBuilder,
        authValidationService: AuthValidationService,
        authService: AuthService,
        router: Router) {

        this._loginForm = formBuilder.group({
            'email': [
                '',
                Validators.compose([
                    Validators.required,
                    authValidationService.emailValidator
                ])],
            'password': [
                '',
                Validators.compose([
                    Validators.required
                ])]
        });
        this._authService = authService;
        this._router = router;
    }

    /**
     * Signin the user
     */
    public signIn(): void {
        let email = this._loginForm.value.email;
        let password = this._loginForm.value.password;

        this._authService.signIn(email, password)
            .subscribe(
                res => {
                    if (res.json().token) {
                        localStorage.setItem('token', res.json().token);
                        this._router.parent.navigate(['Home']);
                    } else {
                        this._loginErrors = 'An error has occured';
                    }
                },
                err => {
                    let body = JSON.parse(err._body);
                    if (body.message) {
                        this._loginErrors = body.message;
                    } else {
                        this._loginErrors = 'An error has occured';
                    }
                }
            );
    }
}