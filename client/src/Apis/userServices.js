import Axios from './axios';

// resgister user API call
const registerService = async (user) => {
    const { data } = await Axios.post('/users/register', user);
    if (data) localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

// login
const loginService = async (user) => {
    const { data } = await Axios.post('/users/login', user);
    if (data) localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

// login with google
const loginGoogleService = async (id) => {
    const { data } = await Axios.get(`/users/login-success/${id}`);
    if (data) localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

//logout
const logoutService = async () => {
    localStorage.removeItem('userInfo');
    return null;
};

// update user
const updateProfileService = async (user, token) => {
    const { data } = await Axios.put('/users', user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (data) localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

//delete profile
const deleteProfileService = async (token) => {
    const { data } = await Axios.delete('/users', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (data) localStorage.removeItem('userInfo');
    return data;
};

//change password
const changePasswordService = async (password, token) => {
    const { data } = await Axios.put('/users/password', password, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//get all favorite movie
const getFavoriteMovie = async (token) => {
    const { data } = await Axios.get('/users/favorite', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
//delete all favorite movie
const deleteFavoriteMovie = async (token) => {
    const { data } = await Axios.delete('/users/favorite', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
// user like movie
const likeMovieService = async (movieId, token) => {
    const { data } = Axios.post(`/users/favorite`, movieId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export {
    registerService,
    loginService,
    loginGoogleService,
    logoutService,
    updateProfileService,
    deleteProfileService,
    changePasswordService,
    getFavoriteMovie,
    deleteFavoriteMovie,
    likeMovieService,
};
