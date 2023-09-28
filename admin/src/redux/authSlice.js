import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as userServices from '../Apis/userServices';
import { ErrorAction, tokenProtection } from './protection';

const initialState = {
    isLoading: false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    success: false,
    error: null,
    users: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //login
        userLoginRequest(state) {
            state.isLoading = true;
        },
        userLoginSucces(state, action) {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.success = true;
            state.error = null;
        },
        userLoginFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        userLoginReset(state) {
            state.error = null;
        },
        //logout
        userlogout(state) {
            state.isLoading = false;
            state.userInfo = null;
            state.success = false;
            state.error = null;
        },
        // admin get all user
        getAllUserRequest(state) {
            state.isLoading = true;
        },
        getAllUserSucces(state, action) {
            state.isLoading = false;
            state.users = action.payload;
            state.success = true;
            state.error = null;
        },
        getAllUserFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        // admin get all user
        deleteUserRequest(state) {
            state.isLoading = true;
        },
        deleteUserSucces(state) {
            state.isLoading = false;
            state.success = true;
            state.error = null;
        },
        deleteUserFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    userLoginFail,
    userLoginRequest,
    userLoginSucces,
    userLoginReset,
    userlogout,
    getAllUserFail,
    getAllUserRequest,
    getAllUserSucces,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSucces,
} = authSlice.actions;

export const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch(userLoginRequest());
        const response = await userServices.loginService(datas);
        dispatch(userLoginSucces(response));

        if (response && !response.isAdmin) {
            toast.error(`You are not admin!`);
        }
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(userLoginFail(error.response.data.message));
        // ErrorAction(error, dispatch);
    }
};

export const logoutAction = () => (dispatch) => {
    userServices.logoutService();
    dispatch(userlogout());
    dispatch(userLoginReset());
};

export const getAllUserAction = () => async (dispatch) => {
    try {
        dispatch(getAllUserRequest());
        const response = await userServices.getAllUserSevice(tokenProtection());
        dispatch(getAllUserSucces(response));
    } catch (error) {
        ErrorAction(error, dispatch);
    }
};
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());
        await userServices.deleteUserSevice(id, tokenProtection());
        dispatch(deleteUserSucces());
        toast.success('User deleted!');
        dispatch(getAllUserAction());
    } catch (error) {
        ErrorAction(error, dispatch);
    }
};

export default authSlice.reducer;
