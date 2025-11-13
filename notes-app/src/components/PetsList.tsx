import usePets from '../hooks/usePets';
import { useState } from 'react';
import ListGridLayout from '../layouts/ListGridLayout';
import InputSelect from './InputSelect';
import LoadingSpinner from './LoadingSpinner';
import PetCard from './PetCard';
import { statusOptions } from '../constants';
import { FindPetsByStatusStatusItem, useFindPetsByStatus } from '../api/api';

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
        return <div>Error</div>;
    }

    return (
        <>
            <div className="pb-8">
                <InputSelect
                    label="Status"
                    id="status"
                    value={status[0]}
                    onChange={(value) =>
                        setStatus((prev) => [
                            ...prev,
                            value as FindPetsByStatusStatusItem,
                        ])
                    }
                    options={statusOptions}
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
