import { useEffect, useState } from 'react';
import { BsCollectionFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import Layout from '../layout/Layout';
import MovieInfo from '../components/Single/MovieInfo';
import MovieCasts from '../components/Single/MovieCasts';
import MovieRate from '../components/Single/MovieRate';
import Title from '../components/Title';
import MoviesItem from './MoviesItem';
import ShareModal from '../components/modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction, getMoviesAction } from '../redux/movieSlice';

function SingleMovies() {
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const { movies, movie } = useSelector((state) => state.movie);

    const related = movies.filter((m) => m.category === movie?.category);
    useEffect(() => {
        dispatch(getMovieByIdAction(id ));
        dispatch(getMoviesAction());
    }, [dispatch, id]);
    console.log(movie);
    return (
        <Layout>
            <ShareModal openModal={openModal} setOpenModal={setOpenModal} movie={movie} />
            <MovieInfo movie={movie} setOpenModal={setOpenModal} />

            <div className="container mx-auto px-2 my-6">
                <MovieCasts movie={movie} />
            </div>

            <MovieRate movie={movie} />

            {related?.length > 0 && (
                <div className="my-16 container mx-auto">
                    <Title title="Related Movies" Icon={BsCollectionFill} />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:mt-10 mt-6 gap-6">
                        {related.map((movie, i) => (
                            <MoviesItem key={i} movie={movie} />
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default SingleMovies;
