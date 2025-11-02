import { Outlet } from 'react-router';

const AppLayout = () => {
    return (
        <div className="container mx-auto py-24">
            <Outlet />
        </div>
    );
};

export default AppLayout;
