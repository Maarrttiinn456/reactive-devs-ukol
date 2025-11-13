import { client } from './client_old';
import type { NewUser, UserSeverResponse } from '../types/global';

export const isUserAuthorized = async () => {
    return await client<UserSeverResponse>('auth/me', 'GET');
};

export const regsiter = async (user: NewUser) => {
    return await client<UserSeverResponse, NewUser>(
        '/auth/register',
        'POST',
        user
    );
};

export const login = async (user: NewUser) => {
    return await client<UserSeverResponse, NewUser>(
        '/auth/login',
        'POST',
        user
    );
};

export const logout = async () => {
    return await client('/auth/logout', 'POST');
};
