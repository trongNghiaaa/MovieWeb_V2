import { useDispatch, useSelector } from 'react-redux';
import Title from '../../Title';
import Movies from './Movies';
import { BsCollectionFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { getRandomMovieAction } from '../../../redux/movieSlice';

function Popular() {
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(getRandomMovieAction());
    }, [dispatch]);
    return (
        <>
            <div className="my-16">
                <Title title="Popular Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                    {[...movies]?.slice(0, 8).map((movie, i) => (
                        <Movies key={i} movie={movie} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Popular;
