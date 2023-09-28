import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/UsedInput';
import Layout from '../layout/Layout';
import { FiLogIn } from 'react-icons/fi';
import { loginValidation } from '../validation/userValidation';
import { InlineError } from '../notfications/error';
import { loginAction, userLoginReset } from '../redux/authSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
// import { SiFacebook } from 'react-icons/si';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error, success, userInfo } = useSelector((state) => state.auth);

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

    const handleLoginGoogle = (type) => {
        window.open(`http://localhost:5000/api/users/auth/${type}`, '_self');
    };

    useEffect(() => {
        if (userInfo) navigate('/user/profile');

        if (success) {
            toast.success(`Welcome back ${userInfo?.fullName}`);
        }

        if (error) {
            toast.error(error);
            dispatch(userLoginReset());
        }
    }, [error, success, userInfo, navigate, dispatch]);

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-2 my-24 flex-cols">
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
                    <div className="flex items-center w-full">
                        <div className="border border-dashed border-gray-500 grow"></div>
                        <div className="px-2 text-gray-500">OR</div>
                        <div className="border border-dashed border-gray-500 grow"></div>
                    </div>
                    <div className="w-full flex-rows bg-gray-200  text-blue-800 rounded transitions hover:bg-gray-500 hover:text-white">
                        <button onClick={() => handleLoginGoogle('google')} type="button" className="flex-rows gap-6 py-3">
                            <FcGoogle className="w-6 h-6" /> Login with Google
                        </button>
                    </div>
                    {/* <div className="w-full flex-rows bg-gray-200  text-blue-800 rounded transitions hover:bg-blue-500 hover:text-white ">
                        <button onClick={() => handleLoginGoogle('facebook')} type="button" className="flex-rows gap-6 py-3">
                            <SiFacebook className="w-6 h-6" /> Login with Facebook
                        </button>
                    </div> */}

                    <p className="text-center text-border">
                        Dont have account ?{' '}
                        <Link to="/register" className="text-dryGray font-semibold ml-2 italic ">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </Layout>
    );
}

export default Login;
