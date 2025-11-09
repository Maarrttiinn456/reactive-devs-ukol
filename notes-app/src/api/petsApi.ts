import type { NewPet, PetsResponse } from '../types/global';
import { client } from './client';

export const getPetsByStats = async (status: string) => {
    return await client<PetsResponse>(
        `pets/pet/findByStatus?status=${status}`,
        'GET'
    );
};

export const addPet = async (data: NewPet) => {
    return await client<PetsResponse, NewPet>('pets/pet', 'POST', data);
};
