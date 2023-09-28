
import Sidebar from '../layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, getAllUserAction } from '../redux/authSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import TableUser from '../components/TableUser';
import Loader from '../notfications/Loader';
import Empty from '../notfications/Empty';

function User() {
    const dispatch = useDispatch();
    const { isLoading, error, users, success } = useSelector((state) => state.auth);

    //delete user
    const handleDeleteUser = (id) => {
        window.confirm('Are you sure you want to delete this user!') && dispatch(deleteUserAction(id));
    };

    useEffect(() => {
        dispatch(getAllUserAction());
        if (error) toast.error(error);
    }, [dispatch, error, success]);

    return (
        <Sidebar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-2xl font-semibold text-white ">Users</h2>
                </div>
                {isLoading ? (
                    <Loader />
                ) : users?.length > 0 ? (
                    <TableUser data={users} onDeleteUser={handleDeleteUser} />
                ) : (
                    <Empty message="User dont have any user!" />
                )}
            </div>
        </Sidebar>
    );
}

export default User;
