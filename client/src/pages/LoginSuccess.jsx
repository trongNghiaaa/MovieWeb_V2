import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogleAction } from '../redux/authSlice';

const LoginSuccess = () => {
    const { id } = useParams();
    console.log(id);

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loginGoogleAction(id));
    }, [id, dispatch]);

    return <div>{userInfo && <Navigate to="/user/profile" replace={true} />}</div>;
};

export default LoginSuccess;
