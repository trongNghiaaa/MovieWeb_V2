import { createSlice } from '@reduxjs/toolkit';
import * as userServices from '../Apis/userServices';
import toast from 'react-hot-toast';

import { ErrorAction, tokenProtection } from './protection';

const initialState = {
    users: [],
    isLoading: false,
    success: false,
    error: null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    //get movie liked
    likedMovies: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //get all user
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
        //register
        userRegisterRequest(state) {
            state.isLoading = true;
        },
        userRegisterSucces(state, action) {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.success = true;
            state.error = null;
        },
        userRegisterFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

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
        //login with google
        userLoginGoogleRequest(state) {
            state.isLoading = true;
        },
        userLoginGoogleSucces(state, action) {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.success = true;
        },
        userLoginGoogleFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        userLoginGoogleReset(state) {
            state.error = null;
        },

        //logout
        userlogout(state) {
            state.isLoading = false;
            state.userInfo = null;
            state.success = false;
            state.error = null;
        },

        //update profile
        userUpdateRequest(state) {
            state.isLoading = true;
        },
        userUpdateSucces(state, action) {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.success = true;
            state.error = null;
        },
        userUpdateFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // delete profile
        userDeleteRequest(state) {
            state.isLoading = true;
        },
        userDeleteSucces(state) {
            state.isLoading = false;
            state.error = null;
            state.userInfo = null;
        },
        userDeleteFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //change password
        changePasswordRequest(state) {
            state.isLoading = true;
        },
        changePasswordSucces(state) {
            state.isLoading = false;
            state.success = true;
            state.error = null;
        },
        changePasswordFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //get favorite movies
        getFavoriteRequest(state) {
            state.isLoading = true;
        },
        getFavoriteSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.likedMovies = action.payload;
        },
        getFavoriteFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete favorite movies
        deleteFavoriteRequest(state) {
            state.isLoading = true;
        },
        deleteFavoriteSucces(state) {
            state.isLoading = false;
            state.error = null;
            state.likedMovies = [];
        },
        deleteFavoriteFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //liked movie
        userLikeMovieRequest(state) {
            state.isLoading = true;
        },
        userLikeMovieSucces(state) {
            state.isLoading = false;
            state.success = true;
            // state.likedMovies.push(action.payload);
        },
        userLikeMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

// action
export const {
    getAllUserRequest,
    getAllUserFail,
    getAllUserSucces,
    userRegisterRequest,
    userRegisterSucces,
    userRegisterFail,
    userLoginRequest,
    userLoginSucces,
    userLoginFail,
    userLoginReset,
    userLoginGoogleFail,
    userLoginGoogleRequest,
    userLoginGoogleReset,
    userLoginGoogleSucces,
    userlogout,
    userUpdateFail,
    userUpdateRequest,
    userUpdateSucces,
    userDeleteFail,
    userDeleteRequest,
    userDeleteSucces,
    changePasswordFail,
    changePasswordRequest,
    changePasswordSucces,
    userLikeMovieFail,
    userLikeMovieRequest,
    userLikeMovieSucces,
    getFavoriteSucces,
    getFavoriteFail,
    getFavoriteRequest,
    deleteFavoriteFail,
    deleteFavoriteRequest,
    deleteFavoriteSucces,
} = authSlice.actions;

//getAllUser
export const getAllUserAction = () => async (dispatch) => {
    try {
        dispatch(getAllUserRequest());
        const response = await userServices.getAllUser();
        dispatch(getAllUserSucces(response));
    } catch (error) {
        dispatch(getAllUserFail(error));
    }
};

//login
export const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch(userLoginRequest());
        const response = await userServices.loginService(datas);
        dispatch(userLoginSucces(response));
    } catch (error) {
        dispatch(userLoginFail(error.response.data.message));
    }
};

//login google
export const loginGoogleAction = (id) => async (dispatch) => {
    try {
        dispatch(userLoginGoogleRequest());
        const response = await userServices.loginGoogleService(id);
        dispatch(userLoginGoogleSucces(response));
    } catch (error) {
        dispatch(userLoginGoogleFail(error));
    }
};

export const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch(userRegisterRequest());
        const response = await userServices.registerService(datas);
        dispatch(userRegisterSucces(response));
    } catch (error) {
        dispatch(userLoginFail(error));
        ErrorAction(error, dispatch);
    }
};

export const logoutAction = () => (dispatch) => {
    userServices.logoutService();
    dispatch(userlogout());
};

export const updateProflieAction = (datas) => async (dispatch) => {
    try {
        dispatch(userUpdateRequest());
        const response = await userServices.updateProfileService(datas, tokenProtection());
        dispatch(userUpdateSucces(response));
        toast.success('Profile updated!');
    } catch (error) {
        dispatch(userUpdateFail(error));
        ErrorAction(error, dispatch);
    }
};

export const deleteProfileAction = () => async (dispatch) => {
    try {
        dispatch(userDeleteRequest());
        await userServices.deleteProfileService(tokenProtection());
        dispatch(userDeleteSucces());
        toast.success('Deleted!');
        dispatch(logoutAction());
    } catch (error) {
        toast.error(error.response.data.error);
        dispatch(userDeleteFail(error.response.data.error));
        // ErrorAction(error, dispatch);
    }
};

export const changePasswordAction = (password) => async (dispatch) => {
    try {
        dispatch(changePasswordRequest());
        await userServices.changePasswordService(password, tokenProtection());
        dispatch(changePasswordSucces());
        toast.success('Change password successfully!');
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.error));
        // ErrorAction(error, dispatch);
    }
};

export const getFavoriteMovieAction = () => async (dispatch) => {
    try {
        dispatch(getFavoriteRequest());
        const response = await userServices.getFavoriteMovie(tokenProtection());
        dispatch(getFavoriteSucces(response));
    } catch (error) {
        dispatch(getFavoriteFail(error.response.data.error));
        // ErrorAction(error, dispatch);
    }
};

export const deleteFavoriteMovieAction = () => async (dispatch) => {
    try {
        dispatch(deleteFavoriteRequest());
        await userServices.deleteFavoriteMovie(tokenProtection());
        dispatch(deleteFavoriteSucces());
        toast.success('All favorite movies deleted!x');
    } catch (error) {
        ErrorAction(error, dispatch);
    }
};

export const likeMovieAction = (movieId) => async (dispatch) => {
    try {
        dispatch(userLikeMovieRequest());
        const response = await userServices.likeMovieService(movieId, tokenProtection());
        dispatch(userLikeMovieSucces(response));
        toast.success('Added to your favorites!');
        dispatch(getFavoriteMovieAction());
    } catch (error) {
        dispatch(userLikeMovieFail(error.response.data.error));
    }
};

export default authSlice.reducer;
