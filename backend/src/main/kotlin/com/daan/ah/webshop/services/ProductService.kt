package com.daan.ah.webshop.services

import com.daan.ah.webshop.models.Product
import com.daan.ah.webshop.repositories.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService (val productRepository: ProductRepository) {
    fun getAllProducts(): List<Product> {
        return productRepository.findAll();
    }

    fun createProduct(product: Product): Product {
        return productRepository.save(product);
    }
}