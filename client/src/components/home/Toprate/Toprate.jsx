/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from 'swiper/react';
import Title from '../../Title';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Rating from '../../Star';
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getRatedMovieAction } from '../../../redux/movieSlice';

const BASR_URL = 'https://image.tmdb.org/t/p/original';

function Toprate() {
    const dispatch = useDispatch();

    const { movies } = useSelector((state) => state.movie);

    const [nextEL, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);

    useEffect(() => {
        dispatch(getRatedMovieAction());
    }, [dispatch]);

    const classNames = 'transitions hover:bg-dry text-sm rounded w-8 h-8 flex-cols bg-subMain text-white';
    return (
        <div className="my-16">
            <Title title="Top Rated" Icon={BsBookmarkStarFill} />
            <div className="mt-10">
                <Swiper
                    navigation={{ nextEl: nextEL, prevEl: prevEl }}
                    slidesPerView={4}
                    spaceBetween={40}
                    autoplay={true}
                    speed={1000}
                    loop={true}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },

                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {movies?.map((movie, i) => (
                        <SwiperSlide key={i}>
                            <div className="hovered p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden">
                                <img
                                    src={`${BASR_URL}/${movie.titleImage}`}
                                    alt={movie.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="hoveres absolute text-center  bg-black bg-opacity-70 px-4 gap-6 top-0 right-0 left-0 bottom-0 ">
                                    <Link
                                        to={`/movies/watch/${movie?._id}`}
                                        className="font-semibold text-xl trancuted line-clamp-2"
                                    >
                                        {movie.name}
                                    </Link>
                                    <div className="flex-rows  gap-2 text-star">
                                        <Rating value={movie.rate} />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="w-full flex-rows px-1 pt-12 gap-6">
                    <button className={classNames} ref={(node) => setPrevEl(node)}>
                        <BsCaretLeftFill />
                    </button>
                    <button className={classNames} ref={(node) => setNextEl(node)}>
                        <BsCaretRightFill />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Toprate;
