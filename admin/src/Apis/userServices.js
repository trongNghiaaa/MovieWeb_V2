import Axios from './axios';

// login
const loginService = async (user) => {
    const { data } = await Axios.post('/users/login', user);
    if (data) localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

//logout
const logoutService = () => {
    localStorage.removeItem('userInfo');
    return null;
};
//get all user
const getAllUserSevice = async (token) => {
    const { data } = await Axios.get('/users', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
//delete  user
const deleteUserSevice = async (id, token) => {
    const { data } = await Axios.delete(`/users/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export { loginService, logoutService, getAllUserSevice, deleteUserSevice };
