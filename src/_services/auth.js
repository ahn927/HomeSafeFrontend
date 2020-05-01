// class Auth {
//     constructor() {
//         this.authenticated = false
//     }

//     login(cb) {
//         this.authenticated = true;
//         cb();
//     }

//     logout(cb) {
//         this.authenticated = false;
//         cb();
//     }

//     isAuthenticated() {
//         return this.isAuthenticated;
//     }
// }

// export default new Auth()

import { BehaviorSubject } from 'rxjs';

import handleResponse from '../handle.response'

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
        body: JSON.stringify({ username, password })
    };

    return fetch(`https://8000/users/authenticate`, requestOptions)
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
}

export default auth;