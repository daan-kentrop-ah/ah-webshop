import {NextRequest, NextResponse} from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === '/login' || pathname === '/api/auth/login') {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('accessToken')?.value;

    if (accessToken) {
        return NextResponse.next();
    }

    const response = pathname.startsWith('/api/')
        ? NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        : NextResponse.redirect(new URL('/login', request.url));

    response.headers.set('Cache-Control', 'no-store');
    response.cookies.delete('accessToken');
    return response;
}

export const config = {
    matcher: ['/((?!_next/static/|_next/image$|favicon\\.ico$|(?:window|globe|next|vercel|file)\\.svg$).*)'],
};
