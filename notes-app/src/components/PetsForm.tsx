import { useState, type FormEvent } from 'react';
import Button from './Button';
import usePets from '../hooks/usePets';

const PetsForm = () => {
    const [name, setName] = useState('');
    const [photoUrls, setPhotoUrls] = useState('');

    const { fetchAddPet } = usePets();

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !photoUrls) {
            return alert('Vyplňte pole');
        }

        const urls = photoUrls.trim().split(',');

        const data = {
            name,
            photoUrls: urls,
            status: 'available',
        };

        fetchAddPet(data);
    };

    return (
        <form className="w-full space-y-6" onSubmit={handleForm}>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="title">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-3 py-2"
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="title">photoUrls</label>
                <input
                    type="text"
                    id="photo"
                    name="photo"
                    value={photoUrls}
                    onChange={(e) => setPhotoUrls(e.target.value)}
                    className="border px-3 py-2"
                />
            </div>

            <div className="flex justify-center">
                <Button type="submit" variant="gray" text="Odeslat" />
            </div>
        </form>
    );
};

export default PetsForm;
