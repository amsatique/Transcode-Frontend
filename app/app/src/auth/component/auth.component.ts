import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig} from "angular2/router";
import {LoginComponent} from 'app/src/auth/component/login.component';
import {RegisterComponent} from 'app/src/auth/component/register.component';

@Component({
    directives: [RouterOutlet],
    template: '<router-outlet></router-outlet>'
})
@RouteConfig([
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/register', name: 'Register', component: RegisterComponent}
])
export class AuthComponent {}