import { BehaviorSubject } from 'rxjs';

import history from '../history'
import handleResponse from '../_helpers/handle.response'
import * as routes from '../_constants/routes'
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const auth = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                "credentialUserName": username,
                "password": password
            })
    };

    return fetch(`https://10kftdb.azurewebsites.net/api/Credentials/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(user)
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    history.push(routes.HOME)
    window.location.reload()
}

export default auth;