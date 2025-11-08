import { useNotes } from '../hooks/useNotes';
import NoteCard from './NoteCard';

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
        <div className="grid grid-cols-3 gap-4">
            {notes?.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default NotesList;
