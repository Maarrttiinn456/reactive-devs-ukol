export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const client = async <TData, TBody = unknown>(
    url: string,
    method: ApiMethod,
    data?: TBody
): Promise<TData> => {
    try {
        const accessToken = window.localStorage.getItem('accessToken');

        const response = await fetch(`/api/${url}`, {
            method: method,
            credentials: 'include',
            headers: !!accessToken
                ? {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${accessToken}`,
                  }
                : {
                      'Content-Type': 'application/json',
                  },
            body: data ? JSON.stringify(data) : undefined,
        });

        console.log('response:', response);

        if (!response.ok) {
            throw new Error('Nepodařilo se načíst datat ze serveru');
        }

        const serverData = (await response.json()) as TData;

        return serverData;
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Něco se pokazilo';

        throw message;
    }
};
