export type Note = {
    id: string;
    title: string;
    text: string;
};

export type NewNote = Omit<Note, 'id'>;

export type NotesResponse = Note[];

export type NoteResponse = Note;

export type User = {
    id: string;
    username: string;
    password: string;
};

export type UserSeverResponse = {
    accessToken: string;
    data: User;
};

export type NewUser = Omit<User, 'id'>;

export type UserResponse = User;
