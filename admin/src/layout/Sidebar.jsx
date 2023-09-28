/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useNavigate,NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiViewGridAdd } from 'react-icons/hi';
import { BiLogOut, BiSolidAddToQueue, BiCategory } from 'react-icons/bi';
import { FaListUl, FaUserAlt } from 'react-icons/fa';

import Layout from './Layout';
import { logoutAction } from '../redux/authSlice';

function Sidebar({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction());
        navigate('/login');
        toast.success('Logged out!!!');
    };
    const sideLink = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: HiViewGridAdd,
        },
        {
            name: 'Movies list',
            link: '/movielist',
            icon: FaListUl,
        },
        {
            name: 'Add movie',
            link: '/add-movie',
            icon: BiSolidAddToQueue,
        },
        {
            name: 'Category',
            link: '/category',
            icon: BiCategory,
        },
        {
            name: 'User',
            link: '/user',
            icon: FaUserAlt,
        },
    ];
    const active = 'bg-dryGray text-subMain';
    const hover = 'hover:text-white hover:bg-main';
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4';

    const Hover = ({ isActive }) => (isActive ? `${active} ${inActive}` : `${inActive} ${hover}`);

    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md mb-5 xl:mb-0 ">
                        {sideLink.map((link, i) => (
                            <NavLink key={i} to={link.link} className={Hover}>
                                <link.icon /> <p>{link.name} </p>
                            </NavLink>
                        ))}
                        <button onClick={logout} className={`${inActive} ${hover} w-full `}>
                            <BiLogOut /> Log out
                        </button>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="100"
                        data-aos-offset="200"
                        className="col-span-6 rounded-lg bg-dry border border-gray-800 p-6"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Sidebar;
