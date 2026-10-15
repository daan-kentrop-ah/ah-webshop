import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (
        typeof username !== 'string' || !username.trim() ||
        typeof password !== 'string' || !password
    ) {
        return NextResponse.json(
            { message: 'Username and password are required' },
            { status: 400 },
        );
    }

    try {
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/v1/auth/login`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            cache: 'no-store',
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: response.status === 401 ? 'Invalid username or password' : 'Login failed' },
                { status: response.status },
            );
        }

        const { accessToken, expiresIn } = await response.json();

        const result = NextResponse.json(
            { expiresIn },
            { headers: { 'Cache-Control': 'no-store' } },
        );

        result.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: expiresIn,
        });

        return result;
    } catch {
        return NextResponse.json({ message: 'Login service unavailable' }, { status: 502 });
    }
}
