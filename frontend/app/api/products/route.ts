import {NextResponse} from "next/server";

export async function GET() {
    try {
        const response = await fetch('http://localhost:8080/v1/products', {
            headers: { accept: 'application/json' },
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Fetching products failed' },
                { status: response.status },
            );
        }

        return NextResponse.json(await response.json());
    } catch {
        return NextResponse.json({ message: 'Fetching products failed' }, { status: 500 });
    }
}
