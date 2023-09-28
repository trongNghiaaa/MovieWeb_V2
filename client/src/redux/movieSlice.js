/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import * as userServices from '../Apis/userServices';
import * as movieServices from '../Apis/movieService';
import toast from 'react-hot-toast';
import { ErrorAction, tokenProtection } from './protection';

const initialState = {
    isLoading: false,
    error: null,
    
    //get all movies
    movies: [],
    pages: 0,
    page: 0,
    totalMovies: 0,
    //get movie by id
    movie: null,
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        

        //get all movie
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
        //get rated movie
        getRatedMovieRequest(state) {
            state.isLoading = true;
        },
        getRatedMovieSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.movies = action.payload;
        },
        getRatedMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //get random movie
        getRandomMovieRequest(state) {
            state.isLoading = true;
        },
        getRandomMovieSucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.movies = action.payload;
        },
        getRandomMovieFail(state, action) {
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
        //review movie
        reviewMovieRequest(state) {
            state.isLoading = true;
        },
        reviewMovieSucces(state) {
            state.isLoading = false;
        },
        reviewMovieFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        reviewMovieReset(state) {
            state.error = null;
        },
    },
});

export const {
    
    getAllMovieFail,
    getAllMovieRequest,
    getAllMovieSucces,
    getMovieByIdFail,
    getMovieByIdRequest,
    getMovieByIdSucces,
    getRandomMovieFail,
    getRandomMovieRequest,
    getRandomMovieSucces,
    getRatedMovieFail,
    getRatedMovieRequest,
    getRatedMovieSucces,
    getMoviesFail,
    getMoviesRequest,
    getMoviesSucces,
    reviewMovieFail,
    reviewMovieRequest,
    reviewMovieSucces,
    reviewMovieReset,
} = movieSlice.actions;

///private user


export const reviewMovieAction =
    ({ id, review }) =>
    async (dispatch) => {
        try {
            dispatch(reviewMovieRequest());
            const response = await movieServices.reviewMovieService(id, review, tokenProtection());
            dispatch(reviewMovieSucces(response));
            toast.success('Review added!');
            dispatch(getMovieByIdAction(id));
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Hiển thị thông báo lỗi từ đối tượng JSON
                dispatch(reviewMovieFail(error.response.data.error));
            }
        }
    };

/// public
export const getAllMovieAction =
    ({ category = '', time = '', language = '', rate = '', year = '', search = '', page = '' }) =>
    async (dispatch) => {
        try {
            dispatch(getAllMovieRequest());
            const response = await movieServices.getAllMovieService({ category, time, language, rate, year, search, page });
            dispatch(getAllMovieSucces(response));
        } catch (error) {
            dispatch(getAllMovieFail(error));
        }
    };

export const getRatedMovieAction = () => async (dispatch) => {
    try {
        dispatch(getRatedMovieRequest());
        const response = await movieServices.getRatedMovieService();
        dispatch(getRatedMovieSucces(response));
    } catch (error) {
        dispatch(getRatedMovieFail(error));
    }
};

export const getRandomMovieAction = () => async (dispatch) => {
    try {
        dispatch(getRandomMovieRequest());
        const response = await movieServices.getRandomMovieService();
        dispatch(getRandomMovieSucces(response));
    } catch (error) {
        dispatch(getRandomMovieFail(error));
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
export const getMoviesAction = () => async (dispatch) => {
    try {
        dispatch(getMoviesRequest());
        const response = await movieServices.getMoviesService();
        dispatch(getMoviesSucces(response));
    } catch (error) {
        dispatch(getMoviesFail(error));
    }
};

export default movieSlice.reducer;
