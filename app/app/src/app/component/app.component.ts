import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent} from 'app/src/home/component/home.component';
import {AuthComponent} from 'app/src/auth/component/auth.component';
import {UserComponent} from 'app/src/user/component/user.component';
import {AuthService} from 'app/src/auth/service/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/src/app/template/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthService]
})
@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true},
    {path: '/auth/...', name: 'Auth', component: AuthComponent},
    {path: '/user/...', name: 'User', component: UserComponent}
])
export class AppComponent {

    private _authService: AuthService;
    private _router: Router;

    constructor(authService: AuthService, router: Router) {
        this._authService = authService;
        this._router = router;
    }

    /**
     * User logout
     */
    public logout() :void {
        this._authService.logout('Home');
    }

    /**
     * Check if user is logged
     *
     * @returns {Boolean} - return if the user is logged
     */
    public isLogged() : Boolean {
        return this._authService.isLogged();
    }
}
