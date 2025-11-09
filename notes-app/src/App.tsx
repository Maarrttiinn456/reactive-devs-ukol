import { Route, Routes, Navigate } from 'react-router';

import AppLayout from './layouts/AppLayout';

//Pages
//import HomePage from './pages/HomePage';

import NotesPage from './pages/NotesPage';
import NotesList from './components/NotesList';
import AddNotes from './pages/AddNotes';
import UpdateNote from './pages/UpdateNote';

import PetsPage from './pages/PetsPage';
import PetsList from './components/PetsList';
import AddPet from './pages/AddPet';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/notes" replace />}></Route>

                <Route path="/notes" element={<NotesPage />}>
                    <Route index element={<NotesList />}></Route>
                    <Route path="add-note" element={<AddNotes />}></Route>
                    <Route
                        path="update-note/:id"
                        element={<UpdateNote />}
                    ></Route>
                </Route>

                <Route path="/pets" element={<PetsPage />}>
                    <Route index element={<PetsList />}></Route>
                    <Route path="add-pet" element={<AddPet />}></Route>
                </Route>
            </Route>

            {/*
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            */}

            {/** TODO 
                <Route path="*" element={}></Route>
                **/}
        </Routes>
    );
};

export default App;
