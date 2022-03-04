import Cookies from 'js-cookie';

const COOKIE_USER = 'user';

// Allowed usernames
const USERNAME_CUSTOMER = 'macro';
const USERNAME_ADMIN = 'admin';

// User types
const UserTypes = {
    ADMIN: 'admin',
    CUSTOMER: 'customer'
}

export const validateLogin = (username) => {
    let message = {
        error: true
    }

    // Empty?
    if (username === '') {
        message.text = 'Username is empty';
        return message;
    }

    // Alphanumeric only?
    if (!username.match(/^[a-z0-9]+$/i)) {
        message.text = 'Username should have only alphanumeric characters';
        return message;
    }

    // Valid user?
    if (![USERNAME_ADMIN, USERNAME_CUSTOMER].includes(username)) {
        message.text = 'Invalid user';
        return message;
    }

    // Correct input
    message.error = false;

    return message;
}

export const login = (username) => {
    let userType = '', redirectPath = '';

    switch (username) {
        case USERNAME_ADMIN:
            userType = UserTypes.ADMIN;
            redirectPath = '/admin';
            break;

        case USERNAME_CUSTOMER:
            userType = UserTypes.CUSTOMER;
            redirectPath = '/movies';
            break;

        default:
            userType = '';
            break;
    }

    // Save cookie
    const user = {
        username,
        type: userType
    }

    Cookies.set(COOKIE_USER, JSON.stringify(user));

    return redirectPath;
}

export const getUser = () => {
    const user = Cookies.get(COOKIE_USER);
    return user !== undefined ? JSON.parse(user) : {};
}

export const isLoggedIn = () => {
    const user = getUser();
    return user.hasOwnProperty('username');
}

export const isAdmin = () => {
    const user = getUser();
    return user !== undefined && user.type === UserTypes.ADMIN;
}

export const logOut = () => {
    Cookies.remove(COOKIE_USER);
}