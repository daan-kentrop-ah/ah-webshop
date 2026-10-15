import {NextResponse} from "next/server";
import {backendFetch} from "@/lib/backend-fetch";
import {CartItem} from "@/components/cart-list";

export async function GET() {
    try {
        const response = await backendFetch('/v1/cart/items', {
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
        return NextResponse.json({ message: 'Fetching cart items failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const response = await backendFetch('/v1/cart/items', {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(await request.json()),
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Adding item failed' },
                { status: response.status },
            );
        }

        return NextResponse.json(await response.json());
    } catch {
        return NextResponse.json({ message: 'Adding item to cart failed' }, { status: 500 });
    }
}
