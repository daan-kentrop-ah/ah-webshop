package com.daan.ah.webshop.facades

import com.daan.ah.webshop.models.CartItem
import com.daan.ah.webshop.services.CartItemService
import org.springframework.stereotype.Service

@Service
class CartItemFacade(private val cartItemService: CartItemService) {
    fun getCartItems(userId: Long): List<CartItem> =
        cartItemService.getCartItems(userId)

    fun addCartItem(userId: Long, productId: Int, quantity: Int): CartItem =
        cartItemService.addCartItem(userId, productId, quantity)

    fun updateQuantity(userId: Long, cartItemId: Long, quantity: Int) =
        cartItemService.updateQuantity(userId, cartItemId, quantity)

    fun deleteCartItem(userId: Long, cartItemId: Long) =
        cartItemService.deleteCartItem(userId, cartItemId)
}
