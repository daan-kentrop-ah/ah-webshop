"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Product} from "@/components/product-list";
import {Button} from "@/components/ui/button";
import {FaCartShopping} from "react-icons/fa6";
import {apiFetch} from "@/lib/api-fetch";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircleIcon} from "lucide-react";
import {toast} from "@/components/ui/toast";
import {useRouter} from "next/navigation";

export default function ProductCard({product}: { product: Product }) {
    const navigation = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (productId: number) => apiFetch('/api/cart/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productId, quantity: 1}),
        }),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['cartitems']}),
    });

    const handleAddToCart = () => {
        mutation.mutate(product.id);
        toast.add({
            title: `${product.name} toegevoegd`,
            description: <Button variant={"outline"} onClick={() => {
                navigation.push('/cart');
            }}>bekijk winkelmandje</Button>,
            type: "success",
            timeout: 2000,

        })
    }

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-square bg-sky-300/15"/>
            <img
                src={product.imageUrl}
                alt="Event cover"
                className="relative z-20 aspect-square w-full object-cover p-16"
            />
            <CardHeader>
                <CardTitle className={"text-xl font-bold text-gray-700"}>{product.name}</CardTitle>
                <CardDescription
                    className={"font-bold text-3xl"}>€ {(product.priceInCents / 100).toFixed(2)}</CardDescription>
            </CardHeader>
            {mutation.isError && (
                <Alert variant="destructive">
                    <AlertCircleIcon/>
                    <AlertTitle>Toevoegen aan winkelmandje mislukt</AlertTitle>
                    <AlertDescription>{mutation.error.message}</AlertDescription>
                </Alert>
            )}
            <CardFooter>
                <Button onClick={handleAddToCart} disabled={mutation.isPending}
                        className="w-full bg-sky-500 hover:bg-sky-600 font-bold">
                    <FaCartShopping/>
                    {mutation.isPending ? 'Toevoegen…' : 'Toevoegen aan winkelmandje'}
                </Button>

            </CardFooter>
        </Card>
    )
}