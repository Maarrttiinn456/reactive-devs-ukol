import { useEffect, useState } from 'react';
import type { NewPet, Pet } from '../types/global';
import { addPet, getPetsByStats } from '../api/petsApi';

const usePets = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [status, setStatus] = useState('available');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchPetsByStatus = async () => {
        try {
            setLoading(true);
            const data = await getPetsByStats(status);
            setPets(data);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Něco se pokazilo';

            console.log(message);
            setMessage(message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddPet = async (data: NewPet) => {
        try {
            setLoading(true);
            await addPet(data);
            setMessage('Nový mazlíček úspěšně vytvořen');
            fetchPetsByStatus();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Něco se pokazilo';

            console.log(message);
            setMessage(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPetsByStatus();
    }, [status]);

    return {
        pets,
        loading,
        message,
        status,
        setStatus,
        fetchPetsByStatus,
        fetchAddPet,
    };
};

export default usePets;
