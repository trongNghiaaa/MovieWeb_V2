import Upload from '../components/Upload';
import Sidebar from '../layout/Sidebar';
import { Input } from '../components/UsedInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileValidation } from '../validation/userValidation';
import { deleteProfileAction, updateProflieAction } from '../redux/authSlice';
import { useEffect, useState } from 'react';
import { InlineError } from '../notfications/error';
import ImagePreview from '../components/ImagePreview';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : '');

    // validate user
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateProfileValidation),
    });

    // update profile
    const onSubmit = (data) => {
        dispatch(updateProflieAction({ ...data, image: imageUrl }));
    };
    //delete profile
    const deleteProfile = () => {
        window.confirm('Are you want to delete your account?') && dispatch(deleteProfileAction());
    };

    useEffect(() => {
        if (userInfo) {
            setValue('fullName', userInfo?.fullName);
            setValue('email', userInfo?.email);
        }
    }, [userInfo, setValue, navigate]);
    return (
        <Sidebar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-white ">Profile</h2>
                <div className="w-full grid lg:grid-cols-12 gap-6">
                    <div className="col-span-10">
                        <Upload setImageUrl={setImageUrl} />
                    </div>
                    <div className="col-span-2">
                        <ImagePreview name={userInfo ? userInfo?.fullName : 'Image preview'} image={imageUrl} />
                    </div>
                </div>
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
                <div className="flex flex-wrap gap-2 flex-col-reverse sm:flex-row justify-between items-center my-4">
                    <button
                        type="button"
                        onClick={deleteProfile}
                        className="bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        Delete Account
                    </button>
                    <button className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Update Profile
                    </button>
                </div>
            </form>
        </Sidebar>
    );
}

export default Profile;
