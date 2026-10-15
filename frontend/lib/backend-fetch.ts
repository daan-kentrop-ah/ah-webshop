import 'server-only';
import {cookies} from 'next/headers';


export async function backendFetch(path: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const headers = new Headers(options.headers);

    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    const response = await fetch(`${backendUrl}${path}`, {
        ...options,
        headers,
        cache: 'no-store',
    });

    if (response.status === 401) cookieStore.delete('accessToken');

    return response;
}
