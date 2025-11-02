import { useEffect, useState } from 'react';
import type { NewNote, NotesResponse } from '../types/global';
import {
    deleteNoteById,
    getNotes,
    createNote,
    updateNoteById,
} from '../api/notesApi';

export const useNotes = () => {
    const [notes, setNotes] = useState<NotesResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getNotes();
            setNotes(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);

        try {
            await deleteNoteById(id);

            setNotes((prev) => {
                if (!prev) return null;
                const result = prev?.filter((note) => note.id !== id);
                return result;
            });
        } catch (error) {
            setError('Něcos e pokzailo při odebírání poznámky');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data: NewNote) => {
        setLoading(true);

        try {
            const createdNote = await createNote(data);

            setNotes((prev) => {
                if (!prev) return [createdNote];

                return [...prev, createdNote];
            });
        } catch (error) {
            setError('Nepodařilo se vytvořit poznámku');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string, data: NewNote) => {
        setLoading(true);
        try {
            const res = await updateNoteById(id, data);
            console.log('res:', res);
        } catch (error) {
            setError('Nepodařilo se aktualizovat poznámku');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getNote = (id?: string) => {
        if (!id) return null;
        if (!notes) return null;
        return notes.find((note) => note.id === id) ?? null;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        notes,
        loading,
        error,
        getNote,
        handleCreate,
        handleDelete,
        handleUpdate,
        refetch: fetchData,
    };
};
