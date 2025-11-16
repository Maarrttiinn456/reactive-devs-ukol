import { useState, type SyntheticEvent } from 'react';
import Button from './Button';
import InputText from './InputText';
import { FindPetsByStatusStatusItem, PetStatus, useAddPet } from '../api/api';
import MultiSelect from './MultiSelect';

const statusOptions = Object.values(PetStatus).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
}));

const PetsForm = () => {
    const [name, setName] = useState('');
    const [photoUrls, setPhotoUrls] = useState('');
    const [status, setStatus] = useState<FindPetsByStatusStatusItem[]>([]);

    const { mutate, isError, isSuccess, error } = useAddPet();

    const handleForm = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !photoUrls) {
            return alert('Vypň prosím pole');
        }

        const photosUrlArray = photoUrls.trim().split(',');

        console.log(photosUrlArray);

        const newPet = {
            name,
            photoUrls: photosUrlArray,
        };

        mutate({ data: newPet });
    };

    return (
        <div className="flex flex-col items-center justify-center">
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

                <MultiSelect
                    statusOptions={statusOptions}
                    selectedValues={status}
                    setValues={setStatus}
                />

                <div className="flex justify-center">
                    <Button type="submit" variant="gray" text="Odeslat" />
                </div>

                {isSuccess && (
                    <div className="text-green-600 text-center">
                        Mazlíček byl úspěšně přidán!
                    </div>
                )}

                {isError && (
                    <div className="text-red-600 text-center">
                        Nastala chyba: {String(error)}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PetsForm;
