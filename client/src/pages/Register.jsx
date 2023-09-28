import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/UsedInput';
import Layout from '../layout/Layout';

import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerAction } from '../redux/authSlice';
import { registerValidation } from '../validation/userValidation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { InlineError } from '../notfications/error';


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error, success, userInfo } = useSelector((state) => state.auth);

    // validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerValidation),
    });

    // onSubmit
    const onSubmit = (data) => {
        dispatch(registerAction(data));
        navigate('/login');
    };

    useEffect(() => {
        if (success) {
            toast.success(`Register succesfully!`);
        }

        if (error) toast.error(error);
    }, [error, success, userInfo, navigate]);
    return (
        <Layout>
            <div className="container mx-auto px-2 my-24 flex-cols">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full 2xl:w-2/5 md:w-3/5 flex-cols gap-8 p-14 bg-dry rounded-lg border border-border"
                >
                    <h1 className="xl:text-3xl text-xl italic text-subMain">Register</h1>
                    
                    <div className="w-full">
                        <Input
                            label="Full Name"
                            placehoder="full name"
                            type="text"
                            bg={true}
                            name="fullName"
                            register={register('fullName')}
                        />
                        {errors.fullName && <InlineError text={errors.fullName.message} />}
                    </div>
                    <div className="w-full">
                        <Input
                            label="Email"
                            placehoder="email@gmail.com"
                            type="email"
                            bg={true}
                            name="email"
                            register={register('email')}
                        />
                        {errors.email && <InlineError text={errors.email.message} />}
                    </div>
                    <div className="w-full">
                        <Input
                            label="Password"
                            placehoder="*******"
                            type="password"
                            bg={true}
                            name="password"
                            register={register('password')}
                        />
                        {errors.password && <InlineError text={errors.password.message} />}
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg border border-gray-800 "
                    >
                        {isLoading ? (
                            '...Loading'
                        ) : (
                            <>
                                <FiLogIn /> Register
                            </>
                        )}
                    </button>
                    <p className="text-center text-border">
                        Already have account ?{' '}
                        <Link to="/login" className="text-dryGray font-semibold ml-2 italic ">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
