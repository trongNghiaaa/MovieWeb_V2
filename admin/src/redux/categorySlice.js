/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import * as categoryServices from '../Apis/categoryService';
import toast from 'react-hot-toast';
import { tokenProtection } from './protection';

const initialState = {
    isLoading: false,
    error: null,
    categories: [],
    success: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        //get category
        getCategoryRequest(state) {
            state.isLoading = true;
        },
        getCategorySucces(state, action) {
            state.isLoading = false;
            state.error = null;
            state.categories = action.payload;
        },
        getCategoryFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete Category movies
        deleteCategoryRequest(state) {
            state.isLoading = true;
        },
        deleteCategorySucces(state) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        deleteCategoryFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //create Category movies
        createCategoryRequest(state) {
            state.isLoading = true;
        },
        createCategorySucces(state) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        createCategoryFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        //update Category movies
        updateCategoryRequest(state) {
            state.isLoading = true;
        },
        updateCategorySucces(state) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        updateCategoryFail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getCategorySucces,
    getCategoryFail,
    getCategoryRequest,
    deleteCategoryFail,
    deleteCategoryRequest,
    deleteCategorySucces,
    createCategoryFail,
    createCategoryRequest,
    createCategorySucces,
    updateCategoryFail,
    updateCategoryRequest,
    updateCategorySucces,
} = categorySlice.actions;

export const getAllCategoryAction = () => async (dispatch) => {
    try {
        dispatch(getCategoryRequest());
        const response = await categoryServices.getCategoryService(tokenProtection());
        dispatch(getCategorySucces(response));
    } catch (error) {
        dispatch(getCategoryFail(error));
    }
};

export const createCategoryAction = (name) => async (dispatch) => {
    try {
        dispatch(createCategoryRequest());
        await categoryServices.createNewCategoryService(name, tokenProtection());
        dispatch(createCategorySucces());
        toast.success('Category created!');
        dispatch(getAllCategoryAction());
    } catch (error) {
        dispatch(createCategoryFail(error));
    }
};

export const updateCategoryAction = (id, name) => async (dispatch) => {
    try {
        dispatch(updateCategoryRequest());
        await categoryServices.updateCategoryService(id, name, tokenProtection());
        dispatch(updateCategorySucces());
        toast.success('Category updated!');
        dispatch(getAllCategoryAction());
    } catch (error) {
        dispatch(updateCategoryFail(error));
    }
};
export const deleteCategoryAction = (id) => async (dispatch) => {
    try {
        dispatch(deleteCategoryRequest());
        await categoryServices.deleteCategoryService(id, tokenProtection());
        dispatch(deleteCategorySucces());
        toast.success('Category deleted!');
        dispatch(getAllCategoryAction());
    } catch (error) {
        dispatch(deleteCategoryFail(error));
    }
};

export default categorySlice.reducer;
