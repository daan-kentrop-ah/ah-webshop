package com.daan.ah.webshop.repositories

import com.daan.ah.webshop.models.CartItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface CartItemRepository : JpaRepository<CartItem, Long> {
    fun findAllByUser_Id(userId: Long): List<CartItem>

    fun findByUser_IdAndProduct_ProductId(userId: Long, productId: Int): CartItem?

    @Modifying
    @Transactional
    @Query(
        "UPDATE CartItem item SET item.quantity = item.quantity + :quantity " +
            "WHERE item.user.id = :userId AND item.product.productId = :productId"
    )
    fun addQuantityForUserProduct(
        @Param("userId") userId: Long,
        @Param("productId") productId: Int,
        @Param("quantity") quantity: Int,
    ): Int

    @Modifying
    @Transactional
    @Query(
        "UPDATE CartItem item SET item.quantity = :quantity " +
            "WHERE item.id = :cartItemId AND item.user.id = :userId"
    )
    fun updateQuantity(
        @Param("cartItemId") cartItemId: Long,
        @Param("userId") userId: Long,
        @Param("quantity") quantity: Int,
    ): Int

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem item WHERE item.id = :cartItemId AND item.user.id = :userId")
    fun deleteCartItem(
        @Param("cartItemId") cartItemId: Long,
        @Param("userId") userId: Long,
    ): Int
}
