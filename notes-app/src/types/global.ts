//Notes
export type Note = {
    id: string;
    title: string;
    text: string;
};

export type NewNote = Omit<Note, 'id'>;

export type NotesResponse = Note[];

export type NoteResponse = Note;

//User
export type User = {
    id: string;
    username: string;
    password: string;
};

export type NewUser = Omit<User, 'id'>;

export type UserResponse = User;

//Auth
export type UserSeverResponse = {
    accessToken: string;
    data: User;
};
