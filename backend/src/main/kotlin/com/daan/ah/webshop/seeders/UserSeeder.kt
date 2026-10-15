package com.daan.ah.webshop.seeders

import com.daan.ah.webshop.models.User
import com.daan.ah.webshop.repositories.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class UserSeeder(
    private val users: UserRepository,
    private val passwords: PasswordEncoder,
) : CommandLineRunner {
    override fun run(vararg args: String) {
        if (users.findByUsername("albert") == null) {
            users.save(User(username = "albert", password = passwords.encode("hamster")!!))
        }
    }
}
