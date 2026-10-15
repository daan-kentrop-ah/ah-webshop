package com.daan.ah.webshop.models

import jakarta.persistence.*

@Entity
@Table(
    name = "cart_item",
    check = [
        CheckConstraint(
            name = "chk_cart_item_quantity_positive",
            constraint = "quantity > 0"
        )
    ],
    uniqueConstraints = [
        UniqueConstraint(
            name = "uc_cart_item_user_product",
            columnNames = ["user_id", "product_id"]
        )
    ]
)
class CartItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    val id: Long? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @ManyToOne( optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    val product: Product,

    @Column(nullable = false)
    val quantity: Int,
)