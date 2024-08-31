const _getJWTPayload = () => {
    const accessToken = localStorage.getItem('access');
    return accessToken && JSON.parse(atob(accessToken.split('.')[1]));
}

const isLoggedIn = () => {
    let jwtPayload = _getJWTPayload();
    return !!jwtPayload && jwtPayload['exp'] > new Date().getTime() / 1000;
}

const getUser = () => {
    if (!isLoggedIn()) return null;

    const jwtPayload = _getJWTPayload();
    const email = jwtPayload['email'];
    const firstName = jwtPayload['firstName'];
    const lastName = jwtPayload['lastName'];
    const phoneNumber = jwtPayload['phoneNumber'];
    const id = jwtPayload['id'];

    return {
        firstName,
        lastName,
        email,
        phoneNumber,
        id,
    };
}

const logout = () => {
    localStorage.removeItem('access');
    document.location = '/login';
}

export default {isLoggedIn, getUser, logout};