import type { NewNote, NoteResponse, NotesResponse } from '../types/global';
import { client } from './client';

export const getNotes = async () => {
    return await client<NotesResponse>('notes', 'GET');
};

export const deleteNoteById = async (id: string) => {
    return await client<NoteResponse>(`notes/${id}`, 'DELETE');
};

export const updateNoteById = async (id: string, data: NewNote) => {
    return await client<NoteResponse, NewNote>(`notes/${id}`, 'PUT', data);
};

export const createNote = async (data: NewNote) => {
    return await client<NoteResponse, NewNote>('notes', 'POST', data);
};
