import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const accessToken = window.localStorage.getItem('accessToken');

    console.log('accessToken:', accessToken);

    if (accessToken) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoutes;
