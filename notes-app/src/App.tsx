import { Route, Routes, Navigate } from 'react-router';

import AppLayout from './layouts/AppLayout';

import PetsPage from './pages/PetsPage';
import PetsList from './components/PetsList';
import AddPet from './pages/AddPet';

import ProtectedRoutes from './guards/ProtectedRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route element={<ProtectedRoutes />}>
                    <Route
                        index
                        element={<Navigate to="/pets" replace />}
                    ></Route>
                    <Route path="/pets" element={<PetsPage />}>
                        <Route index element={<PetsList />}></Route>
                        <Route path="add-pet" element={<AddPet />}></Route>
                    </Route>
                </Route>

                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
            </Route>

            {/** TODO 
                <Route path="*" element={}></Route>
                **/}
        </Routes>
    );
};

export default App;
