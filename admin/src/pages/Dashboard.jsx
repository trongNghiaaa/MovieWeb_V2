/* eslint-disable no-unused-vars */
import { FaRegListAlt, FaUser } from 'react-icons/fa';
import { HiViewGridAdd } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../layout/Sidebar';
import Table from '../components/Table';
import { useEffect } from 'react';
import { deleteALlMoviesAction, deleteMovieAction, getMoviesAction } from '../redux/movieSlice';
import { getAllCategoryAction } from '../redux/categorySlice';
import { getAllUserAction } from '../redux/authSlice';
import Loader from '../notfications/Loader';
import Empty from '../notfications/Empty';

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, movies } = useSelector((state) => state.movie);
    const { categories } = useSelector((state) => state.category);
    const { users } = useSelector((state) => state.auth);

    const dashboard = [
        {
            bg: 'bg-orange-600',
            icon: FaRegListAlt,
            title: 'Total Movies',
            total: movies.length,
        },
        {
            bg: 'bg-blue-700',
            icon: HiViewGridAdd,
            title: 'Total Categories',
            total: categories.length,
        },
        {
            bg: 'bg-green-600',
            icon: FaUser,
            title: 'Total Users',
            total: users.length,
        },
    ];

    const deleteMovieHandle = (id) => {
        window.confirm('Are you sure you wnat to delete this movie') && dispatch(deleteMovieAction(id));
    };
    const deleteAllMovieHandle = () => {
        window.confirm('Are you sure you wnat to delete all movie') && dispatch(deleteALlMoviesAction());
    };

    useEffect(() => {
        if (!userInfo) navigate('/login');
        dispatch(getMoviesAction());
        dispatch(getAllCategoryAction());
        dispatch(getAllUserAction());
    }, [userInfo, navigate, dispatch]);

    return (
        <Sidebar>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {dashboard.map((data, i) => (
                    <div key={i} className="p-4 bg-main border-border grid grid-cols-4 gap-2">
                        <div className={`col-span-1 rounded-full h-12 w-12 flex-cols ${data.bg} `}>
                            <data.icon />
                        </div>
                        <div className="col-span-3 ">
                            <h2>{data.title} </h2>
                            <p className="text-text font-bold mt-2">{data.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-md text-border font-medium my-6">Recent movie</h3>
            </div>
            {isLoading ? (
                <Loader />
            ) : movies.length > 0 ? (
                <>
                    <Table data={[...movies.slice(0, 10)]} field="dashboard" onDeleteHandle={deleteMovieHandle} />
                </>
            ) : (
                <Empty message="Empty" />
            )}
        </Sidebar>
    );
}

export default Dashboard;
