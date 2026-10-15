package com.daan.ah.webshop.facades

import com.daan.ah.webshop.responses.GetProductResponse
import com.daan.ah.webshop.models.Product
import com.daan.ah.webshop.services.ProductService
import com.daan.ah.webshop.responses.toResponse
import org.springframework.stereotype.Service

@Service
class ProductFacade(val productService: ProductService) {
    fun getAllProducts(): List<GetProductResponse> = productService.getAllProducts().map { it.toResponse()};

    fun createProduct(product: Product) = productService.createProduct(product);
}