import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import {CartItem} from "@/components/cart-list";


export default function CartItemCard({cartItem}: { cartItem: CartItem }) {
   return (
       <Item key={cartItem.id} variant="outline" role="listitem">
           <ItemMedia variant="image">
               <img
                   src={cartItem.product.imageUrl}
                   alt={cartItem.product.name}
                   width={128}
                   height={128}
               />
           </ItemMedia><ItemContent>
           <ItemTitle className="line-clamp-1">
               {cartItem.product.name}
           </ItemTitle>
           <ItemDescription>€ {(cartItem.product.priceInCents / 100).toFixed(2)}</ItemDescription>
       </ItemContent><ItemContent className="flex-none text-center">
           <ItemDescription>{cartItem.quantity}</ItemDescription>
       </ItemContent>
       </Item>
   )
}