/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../Title';
import { Message, Select } from '../UsedInput';
import Rating from '../Star';
import userImg from '../../Data/user.png';
import Empty from '../../notfications/Empty';
import { reviewValidation } from '../../validation/movieValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { InlineError } from '../../notfications/error';
import { Link } from 'react-router-dom';
import { reviewMovieAction, reviewMovieReset } from '../../redux/movieSlice';

const ratings = [
    {
        title: '0 - Poor',
        value: 0,
    },
    {
        title: '1 - Fail',
        value: 1,
    },
    {
        title: '2 - Good',
        value: 2,
    },
    {
        title: '3 - Very Good',
        value: 3,
    },
    {
        title: '4 - Excellent',
        value: 4,
    },
    {
        title: '5 - Masterpiece',
        value: 5,
    },
];
function MovieRate({ movie }) {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { error, isLoading } = useSelector((state) => state.movie);

    // validate REVIEW
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(reviewValidation),
    });

    // onSubmit
    const onSubmit = (data) => {
        dispatch(reviewMovieAction({ id: movie?._id, review: data }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(reviewMovieReset());
        }
        reset({
            comment: '',
            rating: 0,
        });
    }, [error, reset, dispatch]);

    return (
        <div className="my-12">
            <Title title="Reviewer" Icon={BsBookmarkStarFill} />
            <div className="mt-10 xl:grid flex-cols grid-cols-5 gap-12 bg-dry xs:p-10 sm:p-20 rounded">
                {/* write review */}
                <form onSubmit={handleSubmit(onSubmit)} className="xl:col-span-2 w-full flex flex-col gap-8">
                    <h3 className="text-xl text-text font-semibold "> {`Review "${movie?.name}"`} </h3>
                    <p className="text-sm leading-7 font-medium text-border">
                        Write a review for this movie. It will be posted on this page.
                    </p>
                    {/* RATE STAR */}
                    <div className="w-full text-sm">
                        <Select label="Select Rating" options={ratings} name="rating" register={register('rating')} />
                        <div className="flex mt-4 text-lg gap-2 text-star">
                            <Rating value={watch('rating', false)} />
                        </div>
                        {errors.rating && <InlineError text={errors.rating.message} />}
                    </div>
                    {/* Message */}
                    <div className="w-full">
                        <Message
                            label="Message"
                            placehoder="Make it short and sweet..."
                            name="comment"
                            register={register('comment')}
                        />
                        {errors.comment && <InlineError text={errors.comment.message} />}
                    </div>
                    {userInfo ? (
                        <button disabled={isLoading} className="bg-subMain text-white py-3 w-full flex-cols rounded">
                            {isLoading ? '...Loading' : 'Submit'}
                        </button>
                    ) : (
                        <Link to="/login" className="bg-main border-subMain text-subMain py-3 w-full flex-cols rounded">
                            Login to review this movie
                        </Link>
                    )}
                </form>
                {/* REVIEW */}
                <div className="col-span-3 w-full flex flex-col gap-6">
                    <h3 className="text-xl text-text font-semibold">Review({movie?.numberOfReview})</h3>

                    <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
                        {error && <p>Some thing went wrong</p>}
                        {movie?.review?.length > 0 ? (
                            movie?.review?.map((rv) => (
                                <div
                                    key={rv?._id}
                                    className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg "
                                >
                                    <div className="col-span-2 bg-main hidden md:block">
                                        <img
                                            src={rv?.userImage ? rv.userImage : userImg}
                                            alt={rv?.userName}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="col-span-7 flex flex-col gap-2">
                                        <h2>{rv?.userName}</h2>
                                        <p className="text-xs leading-6 font-medium text-text">{rv?.comment}</p>
                                    </div>
                                    {/* rate */}
                                    <div className="col-span-3 flex-rows border-l border-border text-sx gap-1 text-star">
                                        <Rating value={rv?.rating} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Empty message={`Be first to rate "${movie?.name}"`} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieRate;
