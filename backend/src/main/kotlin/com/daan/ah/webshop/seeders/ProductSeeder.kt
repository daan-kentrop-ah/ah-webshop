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

            productFacade.createProduct(
                Product(
                    productName = "AH Komkommer",
                    priceInCents = 89,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Zpn4LQmeuqBUW_2q2295IwHaHa%3Fpid%3DApi&f=1&ipt=17232a0ff97241e1eb34232b855b2e5a888ee37733126574f04c150c56acc130&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Zaanse Huisjes melk",
                    priceInCents = 139,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.COZXs1W8Kr7iXny1nWLCtAHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=002c7585151d9fd83cd35384b7c01ce8f30f6d1dd1272549df52acec8379b6db&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Cola Regular",
                    priceInCents = 169,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.jIT0_-gU2Nswbdx3cJcJ0QHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=1e3a352ff43b36433ad4837b0e106f54e2b1bd708ecf2859e319cb597dafe5b3&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Chips Paprika",
                    priceInCents = 119,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.WeOku32WEJW-0ijzuYU5ywAAAA%3Fpid%3DApi&f=1&ipt=e57d281e47b19c50d22bcb315b33447a49ace112d1f8b317b897614f004e3918&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Pindakaas Naturel",
                    priceInCents = 189,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.o9qvg6_JuiEfVHWOfD0GFwHaHa%3Fpid%3DApi&f=1&ipt=83fe1fd69d4e3a0f33b240d8d9a1eccd22a5f45b5571e8abc6cfad359e3ff732&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Muesli Fruit",
                    priceInCents = 219,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.ah.nl%2Fdam%2Fproduct%2FAHI_4354523130303332363933%3FrevLabel%3D1%26rendition%3D800x800_JPG_Q90%26fileType%3Dbinary&f=1&nofb=1&ipt=bec990dd974c4599f12aeb9b111a1d6d11040623f88fb01ab4168e2ddf3bd611&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Reep Melk",
                    priceInCents = 149,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.GbUJqnVSrKC0PHs4Utd1RQHaHa%3Fpid%3DApi&f=1&ipt=435887953eb2951d672a8c2595a52da4a0b0de5d7a60e1ef5d58416daaba8b50&ipo=images"
                )
            )

            productFacade.createProduct(
                Product(
                    productName = "AH Runder Gehakt",
                    priceInCents = 379,
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.5BIKPMwS78xfA7PfVwxOWAHaHa%3Fpid%3DApi&f=1&ipt=1458e70ccba1f4d90ac9a91c509bff7a13c876fefbc7765a4765c0e912ee0a3e&ipo=images"
                )
            )
        }
    }
}