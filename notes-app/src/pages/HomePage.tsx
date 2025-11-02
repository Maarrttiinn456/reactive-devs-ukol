import { Link } from 'react-router';
import NotesList from '../components/NotesList';

const HomePage = () => {
    return (
        <>
            <div className="mb-12 text-center">
                <Link
                    to="/add-note"
                    className="text-xl underline underline-offset-4 hover:no-underline cursor-pointer"
                >
                    Přidat
                </Link>
            </div>
            <NotesList />
        </>
    );
};

export default HomePage;
