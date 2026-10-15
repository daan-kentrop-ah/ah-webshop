package com.daan.ah.webshop.controllers

import com.daan.ah.webshop.facades.UserFacade
import com.daan.ah.webshop.requests.LoginRequest
import com.daan.ah.webshop.responses.TokenResponse
import io.swagger.v3.oas.annotations.security.SecurityRequirements
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/auth")
class AuthController(
    private val userFacade: UserFacade,
) {
    @PostMapping("/login")
    @SecurityRequirements
    fun login(@RequestBody credentials: LoginRequest): ResponseEntity<TokenResponse> =
        ResponseEntity.ok(userFacade.login(credentials))
}
