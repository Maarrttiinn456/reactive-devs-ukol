import { useNotes } from '../hooks/useNotes';
import NoteCard from './NoteCard';
import ListGridLayout from '../layouts/ListGridLayout';

const NotesList = () => {
    const { notes, loading, handleDelete } = useNotes();

    console.log(notes);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!notes?.length) {
        return <div>Nejsou k dispozici žádné poznámky</div>;
    }

    return (
        <ListGridLayout>
            {notes?.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
        </ListGridLayout>
    );
};

export default NotesList;
