package com.daan.ah.webshop.responses

data class TokenResponse(val accessToken: String, val expiresIn: Long = 3600)
