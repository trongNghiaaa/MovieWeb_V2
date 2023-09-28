import { loginAction, userLoginFail } from './authSlice';

export const ErrorAction = (error, dispatch) => {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized,token failed') {
        //sẽ logout  nếu token fail
        dispatch(loginAction());
    }
    return dispatch(userLoginFail(message));
};

export const tokenProtection = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo?.token) {
        return null;
    }
    return userInfo?.token;
};
