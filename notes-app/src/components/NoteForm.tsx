import { useRef, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useNotes } from '../hooks/useNotes';

import Button from './Button';
import type { NewNote } from '../types/global';

type NoteFormProps = {
    mode: 'create' | 'update';
};

const NoteForm = ({ mode }: NoteFormProps) => {
    const { id: noteId } = useParams();

    const navigate = useNavigate();
    const { handleCreate, handleUpdate, getNote } = useNotes();

    const isUpdatedMode = mode === 'update';

    const note = getNote(noteId);

    const title = useRef<HTMLInputElement>(null);
    const text = useRef<HTMLTextAreaElement>(null);

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();

        let titleValue = title.current?.value;
        let textValue = text.current?.value;

        if (!titleValue || !textValue) {
            return alert('Vypňte prosím title a text');
        }

        const formData: NewNote = {
            title: titleValue,
            text: textValue,
        };

        if (mode === 'create') {
            try {
                await handleCreate(formData);
                navigate('/');
            } catch (error) {
                alert('Nepovelo se vytvořit poznámku');
            }
        } else {
            if (noteId) {
                handleUpdate(noteId, formData);
                navigate('/');
            } else {
                alert('Požadovaná poznámka nenalazena');
            }
        }
    };

    return (
        <div className="flex justify-center">
            <form className="w-full max-w-md space-y-6" onSubmit={handleForm}>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        ref={title}
                        defaultValue={isUpdatedMode ? note?.title : ''}
                        className="border px-3 py-2"
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text">Text</label>
                    <textarea
                        id="text"
                        name="text"
                        ref={text}
                        defaultValue={isUpdatedMode ? note?.text : ''}
                        className="border px-3 py-2"
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        variant="gray"
                        text={isUpdatedMode ? 'Upravit' : 'Vytvořit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
