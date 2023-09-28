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
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieValidation } from '../validation/movieValidation';
import { createMovieAction, removeCastAction } from '../redux/movieSlice';
import toast from 'react-hot-toast';
import ImagePreview from '../components/ImagePreview';
import { getAllCategoryAction } from '../redux/categorySlice';

const AddMovie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.category);
    const { isLoading, error, success, casts } = useSelector((state) => state.movie);

    const [openModal, setOpenModal] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [videoUrl, setViedoUrl] = useState('');
    // validate movie
    const {
        register,
        handleSubmit,
        reset,
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
            casts: casts,
        };

        dispatch(createMovieAction(movieData));
    };

    const deleteCastHandle = (id) => {
        dispatch(removeCastAction(id));
        toast.success('Cast deleted!');
    };

    useEffect(() => {
        dispatch(getAllCategoryAction());
        // reset cast khi đóng modal
        if (openModal === false) setCast();
        //nếu tạo film thành công
        if (success) {
            reset({
                name: '',
                time: null,
                language: '',
                year: null,
                category: '',
                overview: '',
            });
            setImageTitle('');
            setImageWithoutTitle('');
            setViedoUrl('');
            navigate('/add-movie');
        }
        if (error) toast.error('Some thing went wrong!');
    }, [openModal, success, reset, navigate, error, dispatch]);
    return (
        <Sidebar>
            <CastModal openModal={openModal} setOpenModal={setOpenModal} cast={cast} />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-white ">Add Movie</h2>
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
                <div className="text-sm w-full">
                    <Select
                        label="Movie Category"
                        options={categories?.length ? categories : []}
                        name="category"
                        register={register('category')}
                    />
                    {errors.category && <InlineError text={errors.category.message} />}
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

export default AddMovie;
