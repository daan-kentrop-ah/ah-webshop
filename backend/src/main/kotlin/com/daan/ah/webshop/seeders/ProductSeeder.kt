package com.daan.ah.webshop.seeders

import com.daan.ah.webshop.facades.ProductFacade
import com.daan.ah.webshop.models.Product
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class ProductSeeder(private val productFacade: ProductFacade) : CommandLineRunner {

    override fun run(vararg args: String) {
        if(productFacade.getAllProducts().isEmpty()) {
            productFacade.createProduct(
                Product(
                    productName = "AH Tros Bananen",
                    priceInCents = 250,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.ah.nl%2Fdam%2Fproduct%2FAHI_4354523130303537313135%3FrevLabel%3D1%26rendition%3D800x800_JPG_Q90%26fileType%3Dbinary&f=1&nofb=1&ipt=f3533cbcd90225ad5833684b37dc8a23db5db92ef005bcf3a53695c43a1c5174&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Halfvolle melk",
                    priceInCents = 119,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.ah.nl%2Fdam%2Fproduct%2FAHI_43545239383332343335%3FrevLabel%3D1%26rendition%3D800x800_JPG_Q90%26fileType%3Dbinary&f=1&nofb=1&ipt=6e0df4bfcae8d1484ea88343d960b6b4dc46b07777b40a81c536e617235ea600&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Tijger wit half",
                    priceInCents = 189,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.thJE4OdjUTfuqlquD-_yyAHaHa%3Fpid%3DApi&f=1&ipt=44747cb11130af4d2b95be8fd1258101a2a02c156c33caab0aa795234019169b&ipo=images"
                )
            )
        }
    }
}