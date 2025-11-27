import { NavLink, useNavigate } from 'react-router';
import { logoutUser } from '../api/api';
import { useMutation } from '@tanstack/react-query';

const Header = () => {
    const navigate = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: () => {
            return logoutUser();
        },
    });

    const handleLogout = async () => {
        await mutateAsync();
        window.localStorage.removeItem('accessToken');
        navigate('/login');
    };

    if (isPending) {
        return <div>Odhlašuji</div>;
    }

    return (
        <div className="flex justify-between gap-x-4 bg-gray-200 py-2 px-4">
            <NavLink
                to="/pets"
                className={({ isActive, isPending }) =>
                    isPending
                        ? 'opcity-50'
                        : isActive
                        ? 'underline'
                        : 'hover:underline'
                }
            >
                Pets
            </NavLink>
            <div onClick={handleLogout}>Logout</div>
        </div>
    );
};

export default Header;
