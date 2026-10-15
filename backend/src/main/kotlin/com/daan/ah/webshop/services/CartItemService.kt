package com.daan.ah.webshop.services

import com.daan.ah.webshop.models.CartItem
import com.daan.ah.webshop.repositories.CartItemRepository
import com.daan.ah.webshop.repositories.ProductRepository
import com.daan.ah.webshop.repositories.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class CartItemService(
    private val cartItemRepository: CartItemRepository,
    private val userRepository: UserRepository,
    private val productRepository: ProductRepository,
) {
    fun getCartItems(userId: Long): List<CartItem> =
        cartItemRepository.findAllByUser_Id(userId)

    @Transactional
    fun addCartItem(userId: Long, productId: Int, quantity: Int): CartItem {
        if (quantity <= 0) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be greater than zero")
        }

        if (cartItemRepository.addQuantityForUserProduct(userId, productId, quantity) > 0) {
            return cartItemRepository.findByUser_IdAndProduct_ProductId(userId, productId)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Cart item not found")
        }

        val user = userRepository.findById(userId).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        }
        val product = productRepository.findById(productId).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found")
        }

        return cartItemRepository.save(CartItem(user = user, product = product, quantity = quantity))
    }

    fun updateQuantity(userId: Long, cartItemId: Long, quantity: Int) {
        if (quantity <= 0) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be greater than zero")
        }

        if (cartItemRepository.updateQuantity(cartItemId, userId, quantity) == 0) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Cart item not found")
        }
    }

    fun deleteCartItem(userId: Long, cartItemId: Long) {
        if (cartItemRepository.deleteCartItem(cartItemId, userId) == 0) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Cart item not found")
        }
    }
}
