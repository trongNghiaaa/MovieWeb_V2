import * as yup from 'yup';

export const reviewValidation = yup.object().shape({
    comment: yup.string().required('Comment is required!').max(200, 'Comment should be less than 200 characters!'),
    rating: yup.number().required('Select a Rating!'),
});
