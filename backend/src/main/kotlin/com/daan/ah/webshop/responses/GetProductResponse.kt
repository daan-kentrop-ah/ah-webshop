package com.daan.ah.webshop.responses

import com.daan.ah.webshop.models.Product

data class GetProductResponse(
    val id: Int,
    val name: String,
    val priceInCents: Int,
    val imageUrl: String,

)

fun Product.toResponse(): GetProductResponse {
    return GetProductResponse(
        id = this.productId ?: 0,
        name = this.productName,
        priceInCents = this.priceInCents,
        imageUrl = this.imageUrl
    )
}