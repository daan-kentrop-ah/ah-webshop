package com.daan.ah.webshop.models

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "product")
class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    val productId: Int? = null,

    @Column(name = "product_name", nullable = false)
    val productName: String,

    @Column(name = "price_in_cents", nullable = false)
    val priceInCents: Int,

    @Column(name = "image_url", columnDefinition = "TEXT")
    val imageUrl: String,

    ) {

}