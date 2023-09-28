/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import Table from '../components/Table';
import Sidebar from '../layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovieAction, getAllMovieAction } from '../redux/movieSlice';
import toast from 'react-hot-toast';
import Loader from '../notfications/Loader';
import Empty from '../notfications/Empty';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';

function MovieList() {
    const dispatch = useDispatch();
    const { isLoading, error, movies, page, pages } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(getAllMovieAction({}));
        if (error) toast.error(error);
    }, [error, dispatch]);

    const handleDeleteMovie = (id) => {
        dispatch(deleteMovieAction(id));
    };

    // phân trang
    const nextPage = () => {
        dispatch(getAllMovieAction({ page: page + 1 }));
    };
    const prevPage = () => {
        dispatch(getAllMovieAction({ page: page - 1 }));
    };
    return (
        <Sidebar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-2xl font-semibold text-white ">Movies List</h2>
                </div>
                {isLoading ? (
                    <Loader />
                ) : movies.length > 0 ? (
                    <>
                        <Table data={movies} field="movielist" onDeleteHandle={handleDeleteMovie} />
                        <div className="w-full flex-rows gap-6 md:my-6 my-3 ">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className="text-white py-1 px-3 rounded font-semibold transitions border-2 border-subMain bg-dry hover:bg-subMain"
                            >
                                <TbPlayerTrackPrev className="text-xl" />
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={page === pages}
                                className="text-white py-1 px-3 rounded font-semibold transitions border-2 border-subMain bg-dry hover:bg-subMain"
                            >
                                <TbPlayerTrackNext className="text-xl" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Empty message="You have no movies" />
                )}
                <div className="flex justify-end">
                    <button className="  w-full sm:w-auto bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
                        Delete All
                    </button>
                </div>
            </div>
        </Sidebar>
    );
}

export default MovieList;
