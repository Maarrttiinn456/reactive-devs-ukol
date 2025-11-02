import NoteForm from '../components/NoteForm';

const UpdateNote = () => {
    return (
        <>
            <div className="text-center mb-4 text-2xl">Uprav poznámku</div>
            <NoteForm mode="update" />
        </>
    );
};

export default UpdateNote;
