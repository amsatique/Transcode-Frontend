import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {CONFIG} from 'app/config/app.config';
import {Router} from 'angular2/router';

@Injectable()
export class AuthService {

    private _http: Http;
    private _router: Router;

    constructor(http: Http, router: Router) {
        this._http = http;
        this._router = router;
    }

    /**
     * Signin the user
     *
     * @param email - User email from signin form
     * @param password - User password from signin form
     * @returns {Observable<Response>} - Promise from signin result
     */
    public signIn(email: string, password: string): Object {
        let singInRoute = '/api/auth/signin';

        let body = JSON.stringify({
            email: email,
            password: password
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(CONFIG.apiEndPoint + singInRoute, body, {headers: headers});
    }

    /**
     * Signup the user
     *
     * @param email - User email from signup form
     * @param password - User password from signup form
     * @returns {Observable<Response>} - Promise from signin result
     */
    public signUp(email: string, password: string): Object {
        let signUpRoute = '/api/auth/signup';

        let body = JSON.stringify({
           email: email,
           password: password
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(CONFIG.apiEndPoint + signUpRoute, body, {headers: headers});
    }

    /**
     * Check if the user can access to this route
     */
    public authenticatedRoute(): void {
        if (!localStorage.getItem('token')) {
            this._router.parent.navigate(['Auth','Login']);
        }
    }

    /**
     * Logout the user
     *
     * @param afterLocation - Location for redirection after logout
     */
    public logout(afterLocation: string): void {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        this._router.navigate([afterLocation]);
    }

    /**
     * Check if user is logged
     *
     * @returns {boolean} - If user is logged
     */
    public isLogged(): Boolean {
        return localStorage.getItem('token') ? true : false;
    }
}