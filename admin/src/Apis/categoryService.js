import Axios from './axios';

//get all category
export const getCategoryService = async () => {
    const { data } = await Axios.get('/categories');
    return data;
};

//create new category
export const createNewCategoryService = async (name, token) => {
    const { data } = await Axios.post('/categories', name, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//delete  category
export const deleteCategoryService = async (id, token) => {
    const { data } = await Axios.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//update  category
export const updateCategoryService = async (id, name, token) => {
    const { data } = await Axios.put(`/categories/${id}`, name, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
