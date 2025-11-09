import { useEffect, useState } from 'react';
import { addPet, getPetsByStats } from '../api/petsApi';
import type { NewPet, Pet } from '../types/global';

export type StatusType = 'available' | 'pending' | 'sold';

const usePets = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [status, setStatus] = useState<StatusType>('available');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPetsByStatus = async () => {
        try {
            setLoading(true);
            const data = await getPetsByStats(status);
            setPets(data);
        } catch (error) {
            console.log('error:', error);
            const message =
                error instanceof Error
                    ? error.message
                    : 'Nepodřilo se načíst poznámky';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddPet = async (data: NewPet) => {
        try {
            setLoading(true);
            await addPet(data);
            fetchPetsByStatus();
        } catch (error) {
            console.log('error:', error);
            const message =
                error instanceof Error
                    ? error.message
                    : 'Nepodřilo se načíst poznámky';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPetsByStatus();
    }, [status]);

    return {
        pets,
        status,
        loading,
        error,
        setStatus,
        fetchAddPet,
    };
};

export default usePets;
