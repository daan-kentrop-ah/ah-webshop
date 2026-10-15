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

export async function DELETE(request: Request) {
    try {
        const { cartItemId } = await request.json();

        const response = await backendFetch(`/v1/cart/items/${cartItemId}`, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Deleting item failed' },
                { status: response.status },
            );
        }

        return new Response(null, { status: response.status });
    } catch {
        return NextResponse.json({ message: 'Deleting item from cart failed' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { cartItemId, quantity } = await request.json();
        const response = await backendFetch(`/v1/cart/items/${cartItemId}`, {
            method: "PATCH",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Updating item quantity failed' },
                { status: response.status },
            );
        }

        return new Response(null, { status: response.status });
    } catch {
        return NextResponse.json({ message: 'Updating item quantity failed' }, { status: 500 });
    }
}
