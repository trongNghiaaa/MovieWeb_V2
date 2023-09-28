import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Table from '../components/Table';
import Sidebar from '../layout/Sidebar';
import { deleteFavoriteMovieAction, getFavoriteMovieAction } from '../redux/authSlice';
import Loader from '../notfications/Loader';
import toast from 'react-hot-toast';
import Empty from '../notfications/Empty';

function Favorite() {
    const dispatch = useDispatch();
    const { error, isLoading, likedMovies } = useSelector((state) => state.auth);
    

    useEffect(() => {
        dispatch(getFavoriteMovieAction());
        if (error) toast.error(error);
    }, [dispatch, error]);
    //delete all favorite
    const deleteAllFavoriteHandle = () => {
        window.confirm('Are you sure you want to delete all movies?') && dispatch(deleteFavoriteMovieAction());
    };
    return (
        <Sidebar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-2xl font-semibold text-white ">Favorite Movies</h2>
                    {likedMovies.length > 0 && (
                        <button
                            onClick={deleteAllFavoriteHandle}
                            className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                        >
                            Delete All
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <Loader />
                ) : likedMovies.length > 0 ? (
                    <Table data={likedMovies}/>
                ) : (
                    <Empty message="Movie not found!" />
                )}
            </div>
        </Sidebar>
    );
}

export default Favorite;
