'use client';

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export async function apiFetch(path: string, options?: RequestInit) {
    const response = await fetch(path, options);

    if (response.status === 401 && window.location.pathname !== '/login') {
        window.location.replace('/login');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new ApiError(response.status, error?.message || 'Het verzoek is mislukt. Probeer het opnieuw.');
    }

    return response;
}
