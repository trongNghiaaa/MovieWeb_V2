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
//get movie by id
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
};

// delete movie
export const deleteMovieService = async (id, token) => {
    const { data } = await Axios.delete(`/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
// delete all movie
export const deleteAllMovieService = async (token) => {
    const { data } = await Axios.delete(`/movies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
// create  movie
export const createMovieService = async (movie, token) => {
    const { data } = await Axios.post(`/movies`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//update movie
export const editMovieService = async (id, movie, token) => {
    const { data } = await Axios.put(`/movies/${id}`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
