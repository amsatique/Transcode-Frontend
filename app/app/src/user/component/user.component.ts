import {Component, OnInit} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {UserProfileComponent} from 'app/src/user/component/user-profile.component';
import {AuthService} from 'app/src/auth/service/auth.service';

@Component({
    templateUrl: 'app/src/user/template/user.component.html',
    directives: [RouterOutlet],
    providers: [AuthService]
})
@RouteConfig([
    {path: '/profile', name: 'Profile', component: UserProfileComponent}
])
export class UserComponent {

    constructor(authService: AuthService) {
        authService.authenticatedRoute();
    }
}