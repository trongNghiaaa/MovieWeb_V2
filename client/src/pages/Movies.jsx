/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';

import Filters from '../components/Filter';
import Layout from '../layout/Layout';
import MoviesItem from './MoviesItem';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Axios from '../Apis/axios';
import { getAllCategoryAction } from '../redux/categorySlice';
import Loader from '../notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import { getAllMovieAction } from '../redux/movieSlice';
import { LanguageData, RatesData, TimeData, YearData } from '../Data/filterData';
import { useParams } from 'react-router-dom';
import { getFavoriteMovieAction } from '../redux/authSlice';

function Movies() {
    // const maxpage = 8;
    // const [page, setPage] = useState(maxpage);

    // const handleLoadingMore = () => {
    //     setPage(page + maxpage);
    // };
    const { search } = useParams();
    const dispatch = useDispatch();
    const [category, setCategory] = useState({ title: 'All Categories' });
    const [years, setYears] = useState(YearData[0]);
    const [times, setTimes] = useState(TimeData[0]);
    const [rates, setRates] = useState(RatesData[0]);
    const [languages, setLanguages] = useState(LanguageData[0]);
    //all movie
    const { isLoading, error, movies, page, pages } = useSelector((state) => state.movie);

    //all category
    const { categories } = useSelector((state) => state.category);

    const queries = useMemo(() => {
        const query = {
            category: category?.name === 'All Categories' ? '' : category?.name,
            language: languages?.title === 'Sort by language' ? '' : languages?.title,
            // time: times?.title === 'Sort by hours' ? '' : times?.title.split(' ')[0],
            // rate: rates?.title === 'Sort by rates' ? '' : rates?.title.split(' ')[0],
            // year: years?.title === 'Sort by year' ? '' : years?.title,
            time: times.title.replace(/\D/g, ''),
            rate: rates.title.replace(/\D/g, ''),
            year: years.title.replace(/\D/g, ''),
            search: search || '',
        };
        return query;
    }, [category, languages, times, rates, years, search]);

    const sameClass = 'w-full gap-6 flex-cols ';

    useEffect(() => {
        dispatch(getAllCategoryAction());
        dispatch(getAllMovieAction(queries));
        if (error) toast.error(error);
    }, [error, dispatch, queries]);
    // phân trang
    const nextPage = () => {
        dispatch(getAllMovieAction({ ...queries, page: page + 1 }));
    };
    const prevPage = () => {
        dispatch(getAllMovieAction({ ...queries, page: page - 1 }));
    };

    const datas = {
        categories: categories,
        category: category,
        setCategory: setCategory,
        languages: languages,
        setLanguages: setLanguages,
        years: years,
        setYears: setYears,
        times: times,
        setTimes: setTimes,
        rates: rates,
        setRates: setRates,
    };

    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2 my-6">
                <Filters datas={datas} />
                <p className="text-lg font-medium my-6 ">
                    Total <span className="font-bold text-subMain">{movies ? movies?.length : 0}</span> items Found
                    {search && `for "${search}"`}
                </p>

                {isLoading ? (
                    <div className={sameClass}>
                        <Loader />
                    </div>
                ) : movies?.length > 0 ? (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:mt-10 mt-6 gap-6">
                            {movies?.map((movie, i) => (
                                <MoviesItem key={i} movie={movie} />
                            ))}
                        </div>
                        {/* loading more */}
                        <div className="w-full flex-rows gap-6 md:my-20 my-10 ">
                            {page === 1 || (
                                <button
                                    onClick={prevPage}
                                    disabled={page === 1}
                                    className="text-white py-2 px-3 rounded font-semibold transitions border-2 border-subMain bg-dry hover:bg-subMain"
                                >
                                    <TbPlayerTrackPrev className="text-xl" />
                                </button>
                            )}
                            {page === pages || (
                                <button
                                    onClick={nextPage}
                                    disabled={page === pages}
                                    className="text-white py-2 px-3 rounded font-semibold transitions border-2 border-subMain bg-dry hover:bg-subMain"
                                >
                                    <TbPlayerTrackNext className="text-xl" />
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={sameClass}>
                        <div className="w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMain text-4xl flex-cols">
                            <RiMovie2Line />
                        </div>
                        <p className="text-border text-sm">We đont have any movie</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Movies;

// eslint-disable-next-line react-refresh/only-export-components
export const loaderMovies = async ({ category = '', time = '', language = '', rate = '', year = '', search = '', page = '' }) => {
    const { data } = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&page=${page}`
    );
    return data;
};
