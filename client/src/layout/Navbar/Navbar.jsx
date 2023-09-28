import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import userImg from '../../Data/user.png';
import { useState } from 'react';

function Navbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const hover = 'hover:text-subMain transitions text-white';
    const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);
    const { userInfo, likedMovies } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/movies/${search}`);
            setSearch(search);
        } else {
            navigate('/movies');
        }
    };
    return (
        <>
            <div className="bg-main text-white shadow-md sticky top-0 z-20 ">
                <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
                    {/* Logo */}
                    <div className="col-span-1 hidden lg:block">
                        <Link to="/">
                            <h1 className="text-2xl text-subMain font-bold">Movie App</h1>
                        </Link>
                    </div>
                    {/* Search */}
                    <div className="col-span-3 ">
                        <form onSubmit={handleSubmit} className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
                            <button type="submit" className="bg-subMain w-12 flex-cols h-12 rounded text-white">
                                <FaSearch />
                            </button>
                            <input
                                type="search"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search movies"
                                className="w-full h-12 font-medium placeholder:text-sm text-black bg-transparent"
                            />
                        </form>
                    </div>
                    {/* Menu */}
                    <div className="col-span-3 font-medium text-sm hidden xl:gap-14 xl:justify-end 2xl:gap-20 lg:flex justify-between items-center ">
                        <NavLink to="/movies" className={Hover}>
                            Movies
                        </NavLink>
                        <NavLink to="/about-us" className={Hover}>
                            About Us
                        </NavLink>
                        <NavLink to="/contact-us" className={Hover}>
                            Contact Us
                        </NavLink>
                        <NavLink to="/login" className={Hover}>
                            {userInfo && userInfo ? (
                                <img src={userInfo.image || userImg} alt="user image" className="w-8 h-8 rounded-full " />
                            ) : (
                                <FaUser className="w-5 h-5" />
                            )}
                        </NavLink>
                        <NavLink to="/user/favorite" className={`${Hover} relative`}>
                            <FaHeart className={` h-5 w-5 hover:text-subMain transitions`} />
                            <div className="absolute rounded-full bg-subMain top-[-20px] left-2 px-1 text-xs">
                                {likedMovies?.length}
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
