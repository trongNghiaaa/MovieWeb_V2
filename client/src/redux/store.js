import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import movieReducer from './movieSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        movie: movieReducer,
        category: categoryReducer,
    },
});

export default store;
