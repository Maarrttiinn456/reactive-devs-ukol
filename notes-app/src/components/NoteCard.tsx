import { useNavigate } from 'react-router';
import Button from './Button';
import type { Note } from '../types/global';

type NoteCardProps = {
    note: Note;
    onDelete: (id: string) => void;
};

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
    const { id, title, text } = note;

    console.log(title);

    const navigate = useNavigate();

    return (
        <div className="p-6 border rounded-md">
            <div className="text-xl ">{title}</div>
            <p className="text-gray-700 my-3 text-sm">{text}</p>
            <div className="mt-6 flex justify-end gap-x-4">
                <Button
                    text="Upravit"
                    variant="gray"
                    onClick={() => navigate(`/update-note/${id}`)}
                />
                <Button
                    text="Smazat"
                    variant="red"
                    onClick={() => onDelete(id)}
                />
            </div>
        </div>
    );
};

export default NoteCard;
