package com.daan.ah.webshop.repositories

import com.daan.ah.webshop.models.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
}
