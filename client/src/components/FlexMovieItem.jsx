/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { SlCalender } from 'react-icons/sl';
import { BsClockHistory } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLike, LikeMovie } from '../util/checkLikeMovie';
import { useEffect } from 'react';
import { getFavoriteMovieAction } from '../redux/authSlice';
// import toast from 'react-hot-toast';

function FlexMovieItem({ movie }) {
    const dispatch = useDispatch();
    const { userInfo, isLoading } = useSelector((state) => state.auth);

    const isLiked = (movie) => {
        return IfMovieLike(movie);
    };
    useEffect(() => {
        dispatch(getFavoriteMovieAction());
    }, [dispatch]);
    return (
        <>
            <div className="flex items-center gap-5 text-dryGray flex-wrap ">
                <span>{movie?.category[0].name}</span>
                <div className="flex items-center gap-2">
                    <SlCalender />
                    <span>{movie?.year}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BsClockHistory />
                    <span>{movie?.time}</span>
                </div>
            </div>
            <div className="py-8 flex gap-8 ">
                <Link
                    to={`/movies/watch/${movie?._id}`}
                    className="bg-subMain px-5 py-1.5 rounded text-sm text-white transitions hover:text-black"
                >
                    Watch
                </Link>
                <button
                    onClick={() => LikeMovie(movie, dispatch, userInfo)}
                    disabled={isLiked(movie) || isLoading}
                    className={`bg-white ${
                        isLiked(movie) ? 'text-subMain' : 'text-white'
                    } px-3.5 bg-opacity-30 rounded text-center transitions hover:text-subMain`}
                >
                    <AiFillHeart
                        className={` transitions hover:text-subMain ${isLiked(movie) ? 'text-subMain' : 'text-white'}`}
                    />
                </button>
            </div>
        </>
    );
}

export default FlexMovieItem;
