import { Route, Routes } from 'react-router';

import AppLayout from './layouts/AppLayout';

//Pages
import HomePage from './pages/HomePage';
import AddNotes from './pages/AddNotes';
import UpdateNote from './pages/UpdateNote';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />}></Route>
                <Route path="/add-note" element={<AddNotes />}></Route>
                <Route path="/update-note/:id" element={<UpdateNote />}></Route>
            </Route>
        </Routes>
    );
};

export default App;
