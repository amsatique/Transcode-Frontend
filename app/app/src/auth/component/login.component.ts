import {Component} from 'angular2/core';
import {LoginFormComponent} from 'app/src/auth/component/login-form.component';

@Component({
    templateUrl: 'app/src/auth/template/login.component.html',
    directives: [LoginFormComponent]
})
export class LoginComponent {}