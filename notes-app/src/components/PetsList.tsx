import { useState } from 'react';
import ListGridLayout from '../layouts/ListGridLayout';
import LoadingSpinner from './LoadingSpinner';
import PetCard from './PetCard';
import {
    FindPetsByStatusStatusItem,
    PetStatus,
    useFindPetsByStatus,
} from '../api/api';
import MultiSelect from './MultiSelect';

const statusOptions = Object.values(PetStatus).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
}));

const PetsList = () => {
    const [status, setStatus] = useState<FindPetsByStatusStatusItem[]>([
        'available',
    ]);

    const { data, isFetching, isError, error } = useFindPetsByStatus({
        status,
    });

    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error: </div>;
    }

    return (
        <>
            <div className="pb-8">
                <MultiSelect
                    statusOptions={statusOptions}
                    selectedValues={status}
                    setValues={setStatus}
                />
            </div>
            <ListGridLayout>
                {data?.slice(0, 20)?.map((pet, index) => (
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
