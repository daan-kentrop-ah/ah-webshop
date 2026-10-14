package com.daan.ah.webshop.repositories

import com.daan.ah.webshop.models.Product
import org.springframework.data.jpa.repository.JpaRepository

interface ProductRepository : JpaRepository<Product, Int> {
}