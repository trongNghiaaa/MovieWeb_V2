/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { IfMovieLike, LikeMovie } from '../util/checkLikeMovie';
import toast from 'react-hot-toast';
import { getFavoriteMovieAction } from '../redux/authSlice';


function MoviesItem({ movie }) {
    const dispatch = useDispatch();
    const { error, userInfo, isLoading } = useSelector((state) => state.auth);

    const isLiked = (movie) => {
        return IfMovieLike(movie);
    };
    useEffect(() => {
        if (error) toast.error(error);
        dispatch(getFavoriteMovieAction());
    }, [dispatch, error]);
    return (
        <>
            <div className="relative border border-border p-1 hover:scale-95 transitions rounded overflow-hidden">
                <Link to={`/movies/watch/${movie?._id}`} className="w-full">
                    <img src={movie?.titleImage} alt={movie?.name} className="w-full h-64 object-cover" />
                </Link>
                <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                    <h3 className="font-semibold truncate">{movie?.name}</h3>
                    <button
                        onClick={() => LikeMovie(movie, dispatch, userInfo)}
                        disabled={isLiked(movie) || isLoading}
                        className={`h-9 w-9 test-sm flex-cols transitions border-2 hover:bg-transparent rounded-md  text-white ${
                            isLiked(movie) ? 'bg-white border-subMain' : 'bg-subMain border-subMain'
                        } `}
                    >
                        <FaHeart className={`${isLiked(movie) ? 'text-subMain' : 'text-white '}`} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default MoviesItem;
