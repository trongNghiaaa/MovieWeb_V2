import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//public
export const ProtectRouter = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
};
//admin protection
export const AdminProtectedRouter = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo?.token ? userInfo?.isAdmin ? <Outlet /> : <Navigate to="*" /> : <Navigate to="/login" />;
};
