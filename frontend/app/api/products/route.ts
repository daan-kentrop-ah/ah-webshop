import {NextResponse} from "next/server";
import {backendFetch} from "@/lib/backend-fetch";

export async function GET() {
    try {
        const response = await backendFetch('/v1/products', {
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
