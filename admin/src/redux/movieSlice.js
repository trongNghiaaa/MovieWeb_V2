/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import * as movieServices from '../Apis/movieService';
import toast from 'react-hot-toast';
import { ErrorAction, tokenProtection } from './protection';

const initialState = {
    isLoading: false,
    error: null,
    success: false,
    movies: [],
    pages: 0,
    page: 0,
    totalMovies: 0,

    //get movie by id
    movie: null,

    category: [],

    casts: [],
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        //get all movie
        getMoviesRequest(state) {
            state.isLoading = true;
        },
        getMoviesSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.movies = action.payload;
        },
        getMoviesFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get  movies by query
        getAllMovieRequest(state) {
            state.isLoading = true;
        },
        getAllMovieSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.movies = action.payload.movies;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
            state.totalMovies = action.payload.totalMovies;
        },
        getAllMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get movie by id
        getMovieByIdRequest(state) {
            state.isLoading = true;
        },
        getMovieByIdSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.movie = action.payload;
        },
        getMovieByIdFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete all movie
        deleteAllMoviesRequest(state) {
            state.isLoading = true;
        },
        deleteAllMoviesSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.movies = [];
        },
        deleteAllMoviesFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //get all movie
        deleteMovieRequest(state) {
            state.isLoading = true;
        },
        deleteMovieSucces(state) {
            state.isLoading = false;
            state.error = null;
        },
        deleteMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //create movie
        createMovieRequest(state) {
            state.isLoading = true;
        },
        createMovieSucces(state) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        createMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //create movie
        editMovieRequest(state) {
            state.isLoading = true;
        },
        editMovieSucces(state) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        editMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //create cast
        addCast(state, action) {
            state.casts.push(action.payload);
        },
        editCast(state, action) {
            const updateCast = state.casts.map((cast) => (cast.id === action.payload.id ? action.payload : cast));
            state.casts = updateCast;
        },
        deleteCast(state, action) {
            state.casts = state.casts.filter((cast) => cast.castId !== action.payload);
        },
        resetCast(state) {
            state.casts = [];
        },
        // apply category
        addCategory(state, action) {
            state.category.push(action.payload);
        },
        deleteCategory(state, action) {
            state.category = state.category.filter((cate) => cate.categoryId !== action.payload);
        },
        resetCategory(state) {
            state.category = [];
        },
    },
});

export const {
    getMoviesFail,
    getMoviesRequest,
    getMoviesSucces,
    getAllMovieFail,
    getAllMovieRequest,
    getAllMovieSucces,
    getMovieByIdFail,
    getMovieByIdRequest,
    getMovieByIdSucces,
    deleteAllMoviesFail,
    deleteAllMoviesRequest,
    deleteAllMoviesSucces,
    deleteMovieFail,
    deleteMovieRequest,
    deleteMovieSucces,
    editMovieFail,
    editMovieRequest,
    editMovieSucces,
    addCast,
    editCast,
    deleteCast,
    resetCast,
    createMovieFail,
    createMovieRequest,
    createMovieSucces,
    deleteCategory,
    addCategory,
} = movieSlice.actions;
//all movie
export const getMoviesAction = () => async (dispatch) => {
    try {
        dispatch(getMoviesRequest());
        const response = await movieServices.getMoviesService();
        dispatch(getMoviesSucces(response));
    } catch (error) {
        dispatch(getMoviesFail(error));
    }
};
//by query
export const getAllMovieAction =
    ({ category = '', time = '', language = '', rate = '', year = '', search = '', page = '' }) =>
    async (dispatch) => {
        try {
            dispatch(getAllMovieRequest());
            const response = await movieServices.getAllMovieService({ category, time, language, rate, year, search, page });
            dispatch(getAllMovieSucces(response));
        } catch (error) {
            dispatch(getAllMovieFail(error.response.data.error));
        }
    };

export const getMovieByIdAction = (id) => async (dispatch) => {
    try {
        dispatch(getMovieByIdRequest());
        const response = await movieServices.getMovieByIdService(id);
        dispatch(getMovieByIdSucces(response));
    } catch (error) {
        dispatch(getMovieByIdFail(error));
    }
};

export const deleteMovieAction = (id) => async (dispatch) => {
    try {
        dispatch(deleteMovieRequest());
        await movieServices.deleteMovieService(id, tokenProtection());
        dispatch(deleteMovieSucces());
        toast.success('Movie deleted!');
        dispatch(getMoviesAction());
    } catch (error) {
        dispatch(deleteMovieFail(error));
    }
};
export const deleteALlMoviesAction = () => async (dispatch) => {
    try {
        dispatch(deleteAllMoviesRequest());
        await movieServices.deleteAllMovieService(tokenProtection());
        dispatch(deleteAllMoviesSucces());
        toast.success('All movie deleted!');
        dispatch(getMoviesAction());
    } catch (error) {
        dispatch(deleteAllMoviesFail(error));
    }
};

export const createMovieAction = (movie) => async (dispatch) => {
    try {
        dispatch(createMovieRequest());
        const response = await movieServices.createMovieService(movie, tokenProtection());
        dispatch(createMovieSucces(response));
        toast.success('New Movie created!');
        dispatch(deleteAllCastAction());
        dispatch(deleteAllCategoryAction());
    } catch (error) {
        dispatch(createMovieFail(error));
    }
};
export const editMovieAction = (id, movie) => async (dispatch) => {
    try {
        dispatch(editMovieRequest());
        // dispatch(deleteAllCastAction());
        const response = await movieServices.editMovieService(id, movie, tokenProtection());
        dispatch(editMovieSucces(response));
        toast.success('New Movie updated!');
        dispatch(getMovieByIdAction(id));
    } catch (error) {
        dispatch(editMovieFail(error));
    }
};
//add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
    dispatch(addCast(cast));
    localStorage.setItem('casts', JSON.stringify(getState().movie.casts));
};
//remove cast
export const removeCastAction = (id) => async (dispatch, getState) => {
    dispatch(deleteCast(id));
    localStorage.setItem('casts', JSON.stringify(getState().movie.casts));
};
//edit cast
export const editCastAction = (cast) => async (dispatch, getState) => {
    dispatch(editCast(cast));
    localStorage.setItem('casts', JSON.stringify(getState().movie.casts));
};
//delete all cast
export const deleteAllCastAction = () => async (dispatch) => {
    dispatch(resetCast());
    localStorage.removeItem('casts');
};

//add category
export const addCategoryAction = (cate) => async (dispatch, getState) => {
    dispatch(addCategory(cate));
    localStorage.setItem('category', JSON.stringify(getState().movie.category));
};
//remove category
export const removeCategoryAction = (id) => async (dispatch, getState) => {
    dispatch(deleteCategory(id));
    localStorage.setItem('category', JSON.stringify(getState().movie.category));
};

//delete all cast
export const deleteAllCategoryAction = () => async (dispatch) => {
    dispatch(removeCategoryAction());
    localStorage.removeItem('category');
};

export default movieSlice.reducer;
