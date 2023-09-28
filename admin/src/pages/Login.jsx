import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/UsedInput';
import Layout from '../layout/Layout';
import { FiLogIn } from 'react-icons/fi';
import { loginValidation } from '../validation/userValidation';
import { InlineError } from '../notfications/error';
import { loginAction, logoutAction } from '../redux/authSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, userInfo } = useSelector((state) => state.auth);

    // validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginValidation),
    });

    // onSubmit
    const onSubmit = (data) => {
        dispatch(loginAction(data));
    };

    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate('/dashboard');
            toast.success(`Welcome back ${userInfo?.fullName}`);
        } else {
            dispatch(logoutAction());
        }
    }, [userInfo, navigate, dispatch]);

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-2 my-24 flex-cols h-full">
                <div className="w-full 2xl:w-2/5 md:w-3/5 flex-cols gap-8 p-14 bg-dry rounded-lg border border-border">
                    <h1 className="xl:text-3xl text-xl italic text-subMain">Login</h1>
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
                                <FiLogIn /> Sign In
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export default Login;
