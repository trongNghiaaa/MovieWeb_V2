import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { likeMovieAction } from '../redux/authSlice';

//kiểm tra xem movie đã được like chưa
export const IfMovieLike = (movie) => {
    const { likedMovies } = useSelector((state) => state.auth);
    return likedMovies?.find((like) => like._id === movie?._id);
};
//
export const LikeMovie = (movie, dispatch, userInfo) => {
    return !userInfo ? toast.error('Please login to like movie!') : dispatch(likeMovieAction({ movieId: movie?._id }));
};
