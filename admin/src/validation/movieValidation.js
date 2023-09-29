import * as yup from 'yup';

export const movieValidation = yup.object().shape({
    name: yup.string().required('Please enter movie name').max(50, 'Movie name should be less than 50 characters!'),
    time: yup.number().required('Please enter movie duration'),
    language: yup.string().required('Please enter movie language'),
    year: yup.number().required('Please enter year of release'),
    overview: yup
        .string()
        .required('Please enter movie description')
        .max(300, 'Movie description should be less than 300 characters!'),
});
