import { NavLink } from 'react-router';
const Header = () => {
    return (
        <div className="flex justify-end gap-x-4 bg-gray-200 py-2 px-4">
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
        </div>
    );
};

export default Header;
