import Axios from './axios';

//get all movie
export const getMoviesService = async () => {
    const { data } = await Axios.get(`/movies/all/movies`);
    return data;
};

//get movies by query
export const getAllMovieService = async ({ category, time, language, rate, year, search, page }) => {
    const { data } = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&page=${page}`
    );
    return data;
};

//get movie random
export const getRandomMovieService = async () => {
    const { data } = await Axios.get('/movies/random/all');
    return data;
};
//get rated random
export const getRatedMovieService = async () => {
    const { data } = await Axios.get('/movies/rated/top');
    return data;
};
//get movie by id
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
};
//create review
export const reviewMovieService = async (id, review, token) => {
    const { data } = await Axios.post(`movies/${id}/review`, review, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
