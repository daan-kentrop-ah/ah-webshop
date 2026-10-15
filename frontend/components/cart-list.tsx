"use client"
import {useQuery} from "@tanstack/react-query";
import {SkeletonCard} from "@/components/product-card-skeleton";
import {FaShoppingCart, FaTimes} from "react-icons/fa";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircleIcon} from "lucide-react";
import {apiFetch} from "@/lib/api-fetch";
import {Product} from "@/components/product-list";
import {Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle} from "@/components/ui/item";
import Link from "next/link";
import CartItemCard from "@/components/cart-item";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export interface CartItem {
    id: number,
    product: Product,
    quantity: number
}

async function getProducts(): Promise<CartItem[]> {
    const res = await apiFetch('/api/cart/items');

    return res.json();
}

export default function CartList() {
    const {data: cartItems, isLoading, isError} = useQuery({queryKey: ['cartitems'], queryFn: getProducts});

    const items: CartItem[] = cartItems ? cartItems : [];

    const totalAmountInEuros = (items.reduce((total, cartItem) => total + (cartItem.product.priceInCents * cartItem.quantity), 0) / 100).toFixed(2)
    const totalAmountOfItems = items.reduce((total, cartItem) => total + cartItem.quantity, 0);
    return (
        <section className={"max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-10 gap-8"}>
            <div className=" col-span-1 md:col-span-7">
                {isLoading && [1, 2, 3, 4, 5].map((number) => {
                    return <SkeletonCard key={number}/>
                })}

                {isError && (
                    <Alert variant="destructive" className="max-w-md col-span-3">
                        <AlertCircleIcon/>
                        <AlertTitle>Ophalen van producten mislukt</AlertTitle>
                        <AlertDescription>
                            We konden de producten helaas niet ophalen
                        </AlertDescription>
                    </Alert>
                )}

                {!isLoading && items.length > 0 ? (
                    <ItemGroup className="gap-4">
                        {items.sort((a, b) => a.id - b.id).map((cartItem: CartItem) => (
                            <CartItemCard cartItem={cartItem} key={cartItem.id}/>
                        ))}

                    </ItemGroup>
                ) : !isError && !isLoading && (
                    <div className={"flex items-center justify-center col-span-3"}>
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FaShoppingCart/>
                                </EmptyMedia>
                                <EmptyTitle>Je winkelwagen is leeg</EmptyTitle>
                                <EmptyDescription>Voeg item toe via de product pagina</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link href={"/"} className={"underline"}>Naar producten</Link>
                            </EmptyContent>
                        </Empty>
                    </div>

                )}
            </div>

            <Card className={"col-span-1 md:col-span-3 h-min"}>
                <CardHeader>
                    <CardTitle className={"text-xl font-bold text-gray-700"}>Totaal</CardTitle>
                    <CardDescription className={"font-bold text-xl"}>€ {totalAmountInEuros} <span className={"text-xs"}>({totalAmountOfItems} producten)</span></CardDescription>
                </CardHeader>
            </Card>

        </section>

    )
}

