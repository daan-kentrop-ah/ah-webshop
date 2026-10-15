package com.daan.ah.webshop.requests

data class AddCartItemRequest(
    val productId: Int,
    val quantity: Int = 1,
)
