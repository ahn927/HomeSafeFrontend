import auth from '../_services/auth'

function authHeader() {
    // return authorization header with jwt token
    const currentUser = auth.currentUserValue;

    if (currentUser && currentUser.token) {
        return { authorization: `Bearer ${currentUser.token}` };
    } else {
        return {}
    }
}