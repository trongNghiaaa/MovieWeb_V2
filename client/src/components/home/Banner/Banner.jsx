import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import FlexMovieItem from '../../FlexMovieItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRandomMovieAction } from '../../../redux/movieSlice';

function Banner() {
    const BASR_URL = 'https://image.tmdb.org/t/p/original';
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(getRandomMovieAction());
    }, [dispatch]);

    return (
        <div className="relative w-full bg-subMain">
            <Swiper
                direction="vertical"
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                className="w-full bg-dry xl:h-96 lg:h-72 h-48"
            >
                {movies?.map((movie, index) => (
                    <SwiperSlide key={index} className="relative rounded overflow-hidden ">
                        <img src={`${BASR_URL}/${movie.image}`} alt={movie.name} className="w-full h-full object-cover" />
                        <div className="absolute linear-bg xl:pl-48 sm:pl-32 pl-18 py-18 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
                            <h1 className="xl:text-3xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
                                {movie.name}
                            </h1>
                            <div className=" text-dryGray">
                                <FlexMovieItem movie={movie} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;
