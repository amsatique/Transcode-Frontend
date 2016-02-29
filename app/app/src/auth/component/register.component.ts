import {Component} from 'angular2/core';
import {RegisterFormComponent} from 'app/src/auth/component/register-form.component';

@Component({
    templateUrl: 'app/src/auth/template/register.component.html',
    directives: [RegisterFormComponent]
})
export class RegisterComponent {}