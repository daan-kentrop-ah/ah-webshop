package com.daan.ah.webshop.services

import com.daan.ah.webshop.models.User
import com.daan.ah.webshop.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun findByUsername(username: String): User? = userRepository.findByUsername(username)
}
