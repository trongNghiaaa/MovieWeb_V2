import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../components/UsedInput';
import Sidebar from '../layout/Sidebar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordValidation } from '../validation/userValidation';
import { changePasswordAction } from '../redux/authSlice';
import { InlineError } from '../notfications/error';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Password() {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.auth);

    // validate user
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changePasswordValidation),
    });

    // update profile
    const onSubmit = (data) => {
        dispatch(changePasswordAction(data));
        reset({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <Sidebar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-white ">Password</h2>
                <div className="w-full">
                    <Input
                        label="Old Password"
                        placehoder="*******"
                        type="password"
                        bg={true}
                        name="oldPassword"
                        register={register('oldPassword')}
                    />
                    {errors.oldPassword && <InlineError text={errors.oldPassword.message} />}
                </div>
                <div className="w-full">
                    <Input
                        label="New Password"
                        placehoder="*******"
                        type="password"
                        bg={true}
                        name="newPassword"
                        register={register('newPassword')}
                    />
                    {errors.newPassword && <InlineError text={errors.newPassword.message} />}
                </div>
                <div className="w-full">
                    <Input
                        label="Confirm Password"
                        placehoder="*******"
                        type="password"
                        bg={true}
                        name="confirmPassword"
                        register={register('confirmPassword')}
                    />
                    {errors.confirmPassword && <InlineError text={errors.confirmPassword.message} />}
                </div>
                <div className="flex justify-end items-center my-4">
                    <button
                        disabled={isLoading}
                        className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        {isLoading ? 'Updating...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </Sidebar>
    );
}

export default Password;
