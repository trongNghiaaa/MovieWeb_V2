/* eslint-disable react/prop-types */
import { FaPlay, FaShareAlt } from 'react-icons/fa';
import FlexMovieItem from '../FlexMovieItem';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Rating from '../Star';



function MovieInfo({ movie, setOpenModal }) {
    return (
        <div className="relative w-full xl:h-screen text-white">
            <img
                src={movie?.image}
                alt={movie?.name}
                className="w-full h-full block xl:inline-block object-cover"
            />
            <div className="xl:bg-main bg-dry flex-cols xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0 ">
                <div className="container mx-auto px-3 xl:grid grid-cols-3 flex-cols py-10 xl:py-20 gap-8">
                    <div className="xl:col-span-1 hidden md:block w-full xl:order-none order-last h-header bg-dry border-gray-800 rounded-lg overflow-hidden ">
                        <img src={movie?.titleImage} alt={movie?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="xl:col-span-2  md:grid grid-cols-5 gap-4 items-center w-full ">
                        <div className="col-span-3 flex flex-col gap-10 ">
                            {/* title */}
                            <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">{movie?.name}</h1>
                            {/* flex-itme */}
                            <div className="flex items-center gap-4 font-medium text-dryGray">
                                <div className="flex-cols bg-subMain text-xs px-2 py-1">HD 4K</div>
                                <FlexMovieItem movie={movie && movie} />
                            </div>
                            {/* overview */}
                            <p className="text-text text-sm leading-6">{movie?.overview}</p>

                            <div className="grid sm:grid-cols-5 grid- gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                                {/* share */}
                                <div className="col-span-1 flex-cols border-r border-border">
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="w-10 h-10 flex-cols rounded-lg bg-white bg-opacity-20"
                                    >
                                        <FaShareAlt />
                                    </button>
                                </div>
                                {/* language */}
                                <div className="col-span-2 flex-cols font-medium text-sm">
                                    <p>
                                        Language : <span className="ml-2 truncate ">{movie?.language}</span>{' '}
                                    </p>
                                </div>

                                {/* watch */}
                                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                                    <Link
                                        to={`/watchs/${movie?._id}`}
                                        className="bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3"
                                    >
                                        <FaPlay className="w-3 h-3" /> Watch
                                    </Link>
                                </div>
                            </div>
                            {/* rating */}
                            <div className="flex  text-lg gap-2 text-star">
                                <Rating value={movie?.rate} />
                            </div>
                        </div>

                        <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
                            <button className="md:w-1/4 w-full relative flex-cols bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-16 rounded font-medium">
                                <div className="flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90 ">
                                    Dowload <FiLogIn className="w-6 h-6 " />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;
