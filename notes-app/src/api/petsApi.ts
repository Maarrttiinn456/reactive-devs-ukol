import type { NewPet, PetsResponse } from '../types/global';
import { client } from './client_old';

export const getPetsByStats = async (status: string) => {
    return await client<PetsResponse>(
        `petstore/pet/findByStatus?status=${status}`,
        'GET'
    );
};

//petstore.swagger.io/v2/pet/findByStatus
export const addPet = async (data: NewPet) => {
    return await client<PetsResponse, NewPet>('petstore/pet', 'POST', data);
};
