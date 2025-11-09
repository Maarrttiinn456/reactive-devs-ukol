import { useState, type SyntheticEvent } from 'react';
import Button from './Button';
import InputText from './InputText';
import InputSelect from './InputSelect';
import type { NewPet } from '../types/global';
import usePets from '../hooks/usePets';
import LoadingSpinner from './LoadingSpinner';
import { statusOptions } from '../constants';

const PetsForm = () => {
    const [name, setName] = useState('');
    const [photoUrls, setPhotoUrls] = useState('');
    const [status, setStatus] = useState('');

    const { fetchAddPet, loading, message } = usePets();

    const handleForm = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !photoUrls) {
            return alert('Vypň prosím pole');
        }

        const photosUrlArray = photoUrls.trim().split(',');

        const dataToFetch: NewPet = {
            name,
            photoUrls: photosUrlArray,
            status: status,
        };

        if (dataToFetch) {
            fetchAddPet(dataToFetch);

            setName('');
            setPhotoUrls('');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {message && <div className="py-4">{message}</div>}
            <form className="w-full max-w-md space-y-6" onSubmit={handleForm}>
                <InputText
                    label="Name"
                    id="name"
                    value={name}
                    onChange={setName}
                />
                <div>
                    <InputText
                        label="PhotoUrls"
                        id="photo"
                        value={photoUrls}
                        onChange={setPhotoUrls}
                    />
                    <div className="text-gray-600 text-xs">
                        Jednolitové URL oddělujte čárkou
                    </div>
                </div>

                <InputSelect
                    label="Status"
                    id="status"
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                />

                <div className="flex justify-center">
                    <Button type="submit" variant="gray" text="Odeslat" />
                </div>
            </form>
        </div>
    );
};

export default PetsForm;
