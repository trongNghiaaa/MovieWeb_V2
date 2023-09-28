import { BsCollectionPlay } from 'react-icons/bs';
import { CgMenuBoxed } from 'react-icons/cg';
import {  FaHome, FaUserCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function MobileFooter() {
    const active = 'bg-white text-black';
    const inActive = 'flex-cols text-2xl transitions hover:bg-white hover:text-main  rounded-md px-4 py-3';

    const Hover = ({ isActive }) => (isActive ? `${active} ${inActive}` : inActive);

    return (
        <>
            <div className="flex-btn w-full h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow"></div>
            <footer className="fixed lg:hidden w-full z-50 bottom-0 px-1">
                <div className="bg-dry rounded-md flex-btn w-full p-1 ">
                    <NavLink to="/" className={Hover}>
                        <FaHome />
                    </NavLink>
                    <NavLink to="/movies" className={Hover}>
                        <BsCollectionPlay />
                    </NavLink>                    
                    <NavLink to="/login" className={Hover}>
                        <FaUserCheck />
                    </NavLink>
                    <NavLink to='/contact-us' className={Hover}>
                        <CgMenuBoxed />
                    </NavLink>
                </div>
            </footer>
        </>
    );
}

export default MobileFooter;
