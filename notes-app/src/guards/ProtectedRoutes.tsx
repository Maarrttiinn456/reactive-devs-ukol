import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = () => {
    const { status } = useAuth();

    if (status != 'authenticated') {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
