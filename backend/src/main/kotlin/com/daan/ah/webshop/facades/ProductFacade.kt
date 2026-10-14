package com.daan.ah.webshop.facades

import com.daan.ah.webshop.models.Product
import com.daan.ah.webshop.services.ProductService
import org.springframework.stereotype.Service

@Service
class ProductFacade(val productService: ProductService) {
    fun getAllProducts() = productService.getAllProducts();
    fun createProduct(product: Product) = productService.createProduct(product);
}