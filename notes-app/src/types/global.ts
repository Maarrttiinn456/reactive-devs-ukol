export type Note = {
    id: string;
    title: string;
    text: string;
};

export type NewNote = Omit<Note, 'id'>;

export type NotesResponse = Note[];

export type NoteResponse = Note;
