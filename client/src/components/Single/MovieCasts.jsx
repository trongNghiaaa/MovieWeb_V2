/* eslint-disable react/prop-types */
import Title from '../Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaUserFriends } from 'react-icons/fa';
import userImg from '../../Data/user.png';

function MovieCasts({ movie }) {
    console.log(movie);
    return (
        <>
            {movie?.casts?.length > 0 && (
                <div className="my-12">
                    <Title title="Casts" Icon={FaUserFriends} />
                    <div className="mt-10">
                        <Swiper
                            autoplay={{ delay: 1000, disableOnInteraction: false }}
                            slidesPerView={4}
                            // loop={true}
                            speed={1000}
                            modules={[Autoplay]}
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
                            {movie?.casts?.map((user, i) => (
                                <SwiperSlide key={i}>
                                    <div className="w-full p-3 italic text-xs text-text rounded flex-cols bg-dry border border-gray-800     ">
                                        <img
                                            src={user?.image ? user?.image : userImg}
                                            alt={user?.name}
                                            className="w-full h-64 object-cover rounded mb-2"
                                        />
                                        <p>{user?.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    );
}

export default MovieCasts;
