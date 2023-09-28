import * as yup from 'yup';

//login validation
export const loginValidation = yup.object().shape({
    email: yup.string().email().required('Email is required!').trim(),
    password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/(?=.*[0-9])/, 'Password must contain a number'),
});

// register validation
export const registerValidation = yup.object().shape({
    email: yup.string().email().required('Email is required!').trim(),
    password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/(?=.*[0-9])/, 'Password must contain a number'),
    fullName: yup
        .string()
        .required('Full name is required!')
        .max(20, 'Full name must be less than 20 characters')
        .matches(/^[a-zA-Z]*$/, 'Full name must contain only letter'),
});

export const updateProfileValidation = yup.object().shape({
    email: yup.string().email().required('Email is required!').trim(),
    fullName: yup
        .string()
        .required('Full name is required!')
        .max(20, 'Full name must be less than 20 characters')
        .matches(/^[a-zA-Z]*$/, 'Full name must contain only letter'),
});

export const changePasswordValidation = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/(?=.*[0-9])/, 'Password must contain a number'),
    newPassword: yup
        .string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/(?=.*[0-9])/, 'Password must contain a number'),
    confirmPassword: yup
        .string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/(?=.*[0-9])/, 'Password must contain a number')
        .oneOf([yup.ref('newPassword'), null], 'Password must matches'),
});
