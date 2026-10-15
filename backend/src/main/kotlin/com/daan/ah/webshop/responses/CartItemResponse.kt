package com.daan.ah.webshop.responses

import com.daan.ah.webshop.models.CartItem

data class CartItemResponse(
    val id: Long,
    val product: GetProductResponse,
    val quantity: Int,
)

fun CartItem.toResponse() = CartItemResponse(
    id = requireNotNull(id),
    product = product.toResponse(),
    quantity = quantity,
)
