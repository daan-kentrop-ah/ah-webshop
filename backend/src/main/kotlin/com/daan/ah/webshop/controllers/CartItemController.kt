package com.daan.ah.webshop.controllers

import com.daan.ah.webshop.facades.CartItemFacade
import com.daan.ah.webshop.requests.AddCartItemRequest
import com.daan.ah.webshop.requests.UpdateCartItemQuantityRequest
import com.daan.ah.webshop.responses.toResponse
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/v1/cart/items")
class CartItemController(private val cartItemFacade: CartItemFacade) {
    @GetMapping
    fun getCartItems(@AuthenticationPrincipal jwt: Jwt) =
        cartItemFacade.getCartItems(userId(jwt)).map { it.toResponse() }

    @PostMapping
    fun addCartItem(
        @AuthenticationPrincipal jwt: Jwt,
        @RequestBody request: AddCartItemRequest,
    ) = cartItemFacade.addCartItem(userId(jwt), request.productId, request.quantity).toResponse()

    @PatchMapping("/{cartItemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updateQuantity(
        @AuthenticationPrincipal jwt: Jwt,
        @PathVariable cartItemId: Long,
        @RequestBody request: UpdateCartItemQuantityRequest,
    ) {
        cartItemFacade.updateQuantity(userId(jwt), cartItemId, request.quantity)
    }

    @DeleteMapping("/{cartItemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteCartItem(
        @AuthenticationPrincipal jwt: Jwt,
        @PathVariable cartItemId: Long,
    ) {
        cartItemFacade.deleteCartItem(userId(jwt), cartItemId)
    }

    private fun userId(jwt: Jwt): Long =
        jwt.subject?.toLongOrNull()
            ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user identity")
}
