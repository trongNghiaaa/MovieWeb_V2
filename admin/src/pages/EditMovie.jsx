/* eslint-disable no-unused-vars */
import Upload from '../components/Upload';
import { Input, Message, Select } from '../components/UsedInput';
import Sidebar from '../layout/Sidebar';
import userImg from '../data/user.jpg';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import CastModal from '../components/modals/castsModal';
import { useState } from 'react';
import { InlineError } from '../notfications/error';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieValidation } from '../validation/movieValidation';
import {
    createMovieAction,
    editMovieAction,
    getMovieByIdAction,
    removeCastAction,
    removeCategoryAction,
} from '../redux/movieSlice';
import toast from 'react-hot-toast';
import ImagePreview from '../components/ImagePreview';
import { getAllCategoryAction } from '../redux/categorySlice';
import SelectModal from '../components/modals/SelectModal';

const EditMovie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, error, casts, movie, category } = useSelector((state) => state.movie);

    const [openModal, setOpenModal] = useState(false);
    const [openModalCategory, setOpenModalCategory] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [videoUrl, setViedoUrl] = useState('');
    // validate movie
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(movieValidation),
    });

    // onSubmit
    const onSubmit = (data) => {
        const movieData = {
            ...data,
            image: imageWithoutTitle,
            titleImage: imageTitle,
            video: videoUrl,
            casts: casts.length > 0 ? casts : movie?.casts,
        };
        console.log(movieData);
        dispatch(editMovieAction(movie?._id, movieData));
        navigate('/movielist');
    };

    const deleteCastHandle = (id) => {
        dispatch(removeCastAction(id));
        toast.success('Cast deleted!');
    };
    const deleteCategoryHandle = (id) => {
        dispatch(removeCategoryAction(id));
        toast.success('Category deleted!');
    };
    useEffect(() => {
        dispatch(getAllCategoryAction());
        if (movie?._id !== id) {
            dispatch(getMovieByIdAction(id));
        } else {
            setValue('name', movie?.name);
            setValue('time', movie?.time);
            setValue('language', movie?.language);
            setValue('year', movie?.year);
            setValue('overview', movie?.overview);
            setImageTitle(movie?.image);
            setImageWithoutTitle(movie?.titleImage);
            setViedoUrl(movie?.video);
        }
        // reset cast khi đóng modal
        if (openModal === false) setCast();

        if (error) toast.error('Some thing went wrong!');
    }, [openModal, reset, error, dispatch, movie, id, setValue]);
    return (
        <Sidebar>
            <CastModal openModal={openModal} setOpenModal={setOpenModal} cast={cast} />
            <SelectModal openModal={openModalCategory} setOpenModal={setOpenModalCategory} />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-white ">Edit {`"${movie?.name}"`}</h2>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <Input
                            label="Movie Title"
                            placehoder="Movie title"
                            type="text"
                            bg={true}
                            name="name"
                            register={register('name')}
                        />
                        {errors.name && <InlineError text={errors.name.message} />}
                    </div>
                    <div className="w-full">
                        <Input label="Hours" placehoder="Hours" type="number" bg={true} name="time" register={register('time')} />
                        {errors.time && <InlineError text={errors.time.message} />}
                    </div>
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <Input
                            label="Language used"
                            placehoder="Language"
                            type="text"
                            bg={true}
                            name="language"
                            register={register('language')}
                        />
                        {errors.language && <InlineError text={errors.language.message} />}
                    </div>
                    <div className="w-full">
                        <Input
                            label="Years of release"
                            placehoder="Years"
                            type="number"
                            bg={true}
                            name="year"
                            register={register('year')}
                        />
                        {errors.year && <InlineError text={errors.year.message} />}
                    </div>
                </div>
                {/* image */}
                <div className="w-full grid md:grid-cols-2 gap-6">
                    {/* image without title */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-border font-semibold">Image without title</p>
                        <Upload setImageUrl={setImageWithoutTitle} />
                        <ImagePreview image={imageWithoutTitle} name="Image without title" />
                    </div>
                    {/* image with title */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-border font-semibold">Image with title</p>
                        <Upload setImageUrl={setImageTitle} />
                        <ImagePreview image={imageTitle} name="Image with title" />
                    </div>
                </div>
                {/* description */}
                <div className="w-full">
                    <Message
                        label="Movie Description"
                        placehoder="Make it short anh sweet..."
                        name="overview"
                        register={register('overview')}
                    />
                    {errors.overview && <InlineError text={errors.overview.message} />}
                </div>
                {/* category */}
                <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
                    <button
                        type="button"
                        onClick={() => setOpenModalCategory(true)}
                        className="w-full bg-main py-4 border border-subMain border-dashed text-white rounded"
                    >
                        Add category
                    </button>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                        {category?.map((cate, i) => (
                            <div key={i} className="flex-rows mt-2 w-full gap-2 border-2 border-border rounded-md py-2">
                                {cate?.name}
                                <button
                                    type="button"
                                    onClick={() => deleteCategoryHandle(cate?.categoryId)}
                                    className="text-subMain border border-border p-1 rounded"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Movie video */}
                <div className="w-full flex flex-col gap-2">
                    <p className="text-sm text-border font-semibold">Movie video</p>
                    <div className={`w-full grid ${videoUrl && 'md:grid-cols-2'} gap-6`}>
                        {videoUrl && (
                            <div className="w-full flex-cols bg-main text-sm text-subMain py-4 border border-border rounded">
                                Video uploaded!!!
                            </div>
                        )}
                        <Upload setImageUrl={setViedoUrl} />
                    </div>
                </div>
                {/* Casts */}
                <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
                    <button
                        type="button"
                        onClick={() => setOpenModal(true)}
                        className="w-full bg-main py-4 border border-subMain border-dashed text-white rounded"
                    >
                        Add cast
                    </button>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                        {casts?.map((cast) => (
                            <div
                                key={cast?.castId}
                                className="p-2 italic text-xs text-text rounded flex-cols bg-main border border-border "
                            >
                                <img
                                    src={cast?.image || userImg}
                                    alt={cast?.name}
                                    className="w-full h-full rounded object-cover"
                                />
                                <p className="pt-2">{cast?.name}</p>
                                <div className="flex-rows mt-2 w-full gap-2 ">
                                    <button
                                        type="button"
                                        onClick={() => deleteCastHandle(cast?.castId)}
                                        className="w-6 h-6 flex-cols bg-dry border border-border text-subMain rounded"
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCast(cast);
                                            setOpenModal(true);
                                        }}
                                        className="w-6 h-6 flex-cols bg-dry border border-border text-green-600 rounded"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* submit */}

                <button
                    disabled={isLoading}
                    className="flex-rows gap-6 bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                >
                    {isLoading ? (
                        'Please wait...'
                    ) : (
                        <>
                            <ImUpload /> Publish Movie
                        </>
                    )}
                </button>
            </form>
        </Sidebar>
    );
};

export default EditMovie;
