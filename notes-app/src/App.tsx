import { Route, Routes } from 'react-router';

import AppLayout from './layouts/AppLayout';

//Pages
import HomePage from './pages/HomePage';
import AddNotes from './pages/AddNotes';
import UpdateNote from './pages/UpdateNote';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import ProtectedRoutes from './guards/ProtectedRoutes';

const App = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="/add-note" element={<AddNotes />}></Route>
                    <Route
                        path="/update-note/:id"
                        element={<UpdateNote />}
                    ></Route>
                </Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
            </Route>
        </Routes>
    );
};

export default App;
