import usePets from '../hooks/usePets';
import LoadingSpinner from './LoadingSpinner';
import PetCard from './PetCard';
import PetsForm from './PetsForm';
import InputSelect from './InputSelect';

import { statusOptions } from '../constants';

const PetsList = () => {
    const { pets, status, loading, setStatus } = usePets();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (pets.length === 0) {
        return <div>Nemám žádná data</div>;
    }

    return (
        <>
            <div className="max-w-xl mx-auto">
                <PetsForm />
                <InputSelect
                    id="status"
                    label="status"
                    value={status}
                    options={statusOptions}
                    onChange={setStatus}
                />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                {pets.map((pet, index) => (
                    <PetCard key={`${pet.id}-${index}`} pet={pet} />
                ))}
            </div>
        </>
    );
};

export default PetsList;
