import usePets from '../hooks/usePets';
import ListGridLayout from '../layouts/ListGridLayout';
import InputSelect from './InputSelect';
import LoadingSpinner from './LoadingSpinner';
import PetCard from './PetCard';
import { statusOptions } from '../constants';

const PetsList = () => {
    const { pets, loading, status, setStatus } = usePets();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="pb-8">
                <InputSelect
                    label="Status"
                    id="status"
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                />
            </div>
            <ListGridLayout>
                {pets.slice(0, 20)?.map((pet, index) => (
                    <PetCard
                        key={`${pet.id}-${pet.name}-${pet.status}-${index}`}
                        pet={pet}
                    />
                ))}
            </ListGridLayout>
        </>
    );
};

export default PetsList;
