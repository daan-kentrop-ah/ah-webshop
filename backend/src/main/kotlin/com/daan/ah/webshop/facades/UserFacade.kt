package com.daan.ah.webshop.facades

import com.daan.ah.webshop.models.User
import com.daan.ah.webshop.requests.LoginRequest
import com.daan.ah.webshop.responses.TokenResponse
import com.daan.ah.webshop.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.jose.jws.MacAlgorithm
import org.springframework.security.oauth2.jwt.*
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.Instant

@Service
class UserFacade(
    private val userService: UserService,
    private val passwords: PasswordEncoder,
    private val jwtEncoder: JwtEncoder,
) {
    fun findByUsername(username: String): User? = userService.findByUsername(username)

    fun login(credentials: LoginRequest): TokenResponse {
        val user = findByUsername(credentials.username)
        if (user == null || !passwords.matches(credentials.password, user.password)) {
            throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password")
        }
        return createTokenResponse(user)
    }

    private fun createTokenResponse(user: User): TokenResponse {
        val now = Instant.now()
        val claims = JwtClaimsSet.builder().issuer("ah.webshop").subject(user.id.toString())
            .issuedAt(now).expiresAt(now.plusSeconds(3600)).claim("username", user.username).build()
        val header = JwsHeader.with(MacAlgorithm.HS256).build()
        val token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).tokenValue
        return TokenResponse(accessToken = token)
    }
}
