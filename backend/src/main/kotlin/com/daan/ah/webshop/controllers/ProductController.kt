package com.daan.ah.webshop.controllers

import com.daan.ah.webshop.facades.ProductFacade
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/products"])
class ProductController(private val productFacade: ProductFacade) {
    @GetMapping
    fun getAllProducts() = productFacade.getAllProducts();
}