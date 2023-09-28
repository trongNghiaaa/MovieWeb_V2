import { Link, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import about2 from '../Data/about2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../redux/movieSlice';
import { getFavoriteMovieAction } from '../redux/authSlice';

function WatchPage() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const { movie } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(getMovieByIdAction(id));
        dispatch(getFavoriteMovieAction());
    }, [id, dispatch]);

    const [play, setPlay] = useState(false);

    return (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-12">
                <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
                    <Link
                        to={`/movies/watch/${movie?._id}`}
                        className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
                    >
                        <BiArrowBack /> {movie?.name}
                    </Link>
                </div>

                {/* watch video */}
                {play ? (
                    <video autoPlay={play} controls className="w-full h-full rounded">
                        <source src={movie?.video} type="video/mp4" title={movie?.name} />
                    </video>
                ) : (
                    <div className="relative w-full h-screen overflow-hidden rounded-lg">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-main bg-opacity-30 flex-cols ">
                            <button
                                onClick={() => setPlay(true)}
                                className="bg-white text-subMain flex-cols border border-subMain w-20 h-20 rounded-full font-medium text-xl"
                            >
                                <FaPlay />
                            </button>
                        </div>
                        <img
                            src={movie?.image ? movie?.titleImage : about2}
                            alt={movie?.name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default WatchPage;
