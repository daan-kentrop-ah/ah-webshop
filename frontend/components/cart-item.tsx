"use client"
import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import {CartItem} from "@/components/cart-list";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiFetch} from "@/lib/api-fetch";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {FaMinus, FaPlus, FaTrash} from "react-icons/fa6";
import {toast} from "@/components/ui/toast";


export default function CartItemCard({cartItem}: { cartItem: CartItem }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: () => apiFetch('/api/cart/items', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cartItemId: cartItem.id}),
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['cartitems']});
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
        toast.add({
            title: `${cartItem.product.name} verwijderd`,
            description: `${cartItem.product.name} is succesvol uit het winkelmandje verwijderd`,
            type: "success",
            timeout: 2000,
        })
    }

    const quantityMutation = useMutation({
        mutationFn: (newQuantity: number) => apiFetch('/api/cart/items', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cartItemId: cartItem.id, quantity: newQuantity}),
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['cartitems']});
        },
    });

    const handleQuantityChange = (change: 1 | -1, productId: number) => {
        const newQuantity = cartItem.quantity + change;
        if (newQuantity <= 0) {
            handleDelete();
        } else {
            quantityMutation.mutate(newQuantity);
            toast.add({
                title: `${cartItem.product.name} bijgewerkt`,
                description: `${cartItem.product.name} is succesvol bijgewerkt`,
                type: "success",
                timeout: 2000,
            })
        }
    }

    return (
        <Item key={cartItem.id} variant="outline" role="listitem">
            <ItemMedia variant="image">
                <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    width={128}
                    height={128}
                />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="line-clamp-1">
                    {cartItem.product.name}
                </ItemTitle>
                <ItemDescription>€ {(cartItem.product.priceInCents / 100).toFixed(2)}</ItemDescription>
            </ItemContent>
            <ItemContent className=" text-center flex flex-row items-center justify-center gap-2">
                <ItemDescription>
                    <span className={"text-lg"}>{cartItem.quantity}</span>
                </ItemDescription>
                <ButtonGroup>
                    <Button onClick={()=>{handleQuantityChange(-1, cartItem.product.id)}} disabled={deleteMutation.isPending} variant="outline" size={"icon"}><FaMinus/></Button>
                    <Button onClick={()=>{handleQuantityChange(1, cartItem.product.id)}} disabled={deleteMutation.isPending} variant="outline" size={"icon"}><FaPlus/></Button>
                    <Button onClick={handleDelete} disabled={deleteMutation.isPending} variant="outline" size={"icon"}><FaTrash/></Button>
                </ButtonGroup>
            </ItemContent>
        </Item>
    )
}