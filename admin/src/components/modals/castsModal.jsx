/* eslint-disable react/prop-types */

import MainModal from './MainModal';
import { Input } from '../UsedInput';
import Upload from '../Upload';
import userImg from '../../data/user.jpg';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addCastAction, editCastAction } from '../../redux/movieSlice';
import toast from 'react-hot-toast';
import { InlineError } from '../../notfications/error';
import ImagePreview from '../ImagePreview';
// import { createCategoryAction, updateCategoryAction } from '../../redux/categorySlice';
// import toast from 'react-hot-toast';

function CastModal({ openModal, setOpenModal, cast }) {
    const dispatch = useDispatch();
    const [castImage, setCastImage] = useState('');
    const generateId = Math.floor(Math.random() * 100000000);
    const image = castImage ? castImage : cast?.image;

    // validate cast
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required('Cast Name is required!'),
            })
        ),
    });

    const onSubmit = (data) => {
        // nếu cast ko null thì update cast
        if (cast) {
            dispatch(
                editCastAction({
                    ...data,
                    image: image,
                    castId: cast.castId,
                })
            );
            toast.success('Cast updated!');
        } else {
            dispatch(
                addCastAction({
                    ...data,
                    image: image,
                    castId: generateId,
                })
            );
            toast.success('Cast crerated!');
        }
        reset();
        setCastImage('');
        setOpenModal(false);
    };
    useEffect(() => {
        if (cast) setValue('name', cast?.name);
    }, [cast, setValue]);
    

    return (
        <MainModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className="inline-block w-full h-full sm:w-4/5 md:w-3/5 lg:w-2/5 border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-lg ">
                <h2 className="text-3xl font-bold">{cast ? 'Update Cast' : 'Create Cast'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left mt-6">
                    <div className="w-full">
                        <Input
                            label="Cast Name"
                            placehoder={cast?.name || 'Cast name'}
                            type="text"
                            bg={true}
                            name="name"
                            register={register('name')}
                        />
                        {errors.name && <InlineError text={errors.name.message} />}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-border font-semibold">Cast Image</p>
                        <Upload setImageUrl={setCastImage} />
                        <ImagePreview image={image ? image : userImg} name="Cast Image" />
                    </div>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="w-full flex-cols  py-3 rounded bg-subMain hover:bg-transparent border border-subMain transitions text-white"
                    >
                        {cast ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CastModal;
