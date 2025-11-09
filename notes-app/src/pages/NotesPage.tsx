import { Outlet, NavLink } from 'react-router';
import SubNavigation from '../components/SubNavigation';

const NotesPage = () => {
    return (
        <>
            <SubNavigation>
                <NavLink
                    to=""
                    end
                    className={({ isActive, isPending }) =>
                        [
                            'px-3 py-0.2 ',
                            isPending
                                ? 'opcity-50'
                                : isActive
                                ? 'bg-gray-800 text-white'
                                : 'hover:underline',
                        ].join(' ')
                    }
                >
                    List
                </NavLink>
                <NavLink
                    to="add-note"
                    className={({ isActive, isPending }) =>
                        [
                            'px-3 py-0.2 ',
                            isPending
                                ? 'opcity-50'
                                : isActive
                                ? 'bg-gray-800 text-white'
                                : 'hover:underline',
                        ].join(' ')
                    }
                >
                    Add
                </NavLink>
            </SubNavigation>

            <Outlet />
        </>
    );
};

export default NotesPage;
