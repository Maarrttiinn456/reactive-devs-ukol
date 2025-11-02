import NoteForm from '../components/NoteForm';

const AddNotes = () => {
    return (
        <>
            <div className="text-center mb-4 text-2xl">Přidat poznámku</div>
            <NoteForm mode="create" />
        </>
    );
};

export default AddNotes;
