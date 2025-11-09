import { Outlet } from 'react-router';
import Header from '../components/Header';

const AppLayout = () => {
    return (
        <div className="container mx-auto px-4">
            <Header />

            <div className="py-24">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
