import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Product} from "@/components/product-list";
import {Button} from "@/components/ui/button";
import {FaCartShopping} from "react-icons/fa6";

export default function ProductCard({product}: {product: Product}){
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-square bg-sky-300/15" />
            <img
                src={product.imageUrl}
                alt="Event cover"
                className="relative z-20 aspect-square w-full object-cover p-16"
            />
            <CardHeader>
                <CardTitle className={"text-xl font-bold text-gray-700"}>{product.name}</CardTitle>
                <CardDescription className={"font-bold text-3xl"}>€ {(product.priceInCents / 100 ).toFixed(2)}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button disabled={true} className="w-full bg-sky-500 hover:bg-sky-600 font-bold"><FaCartShopping/> Toevoegen aan winkelmandje</Button>

            </CardFooter>
        </Card>
    )
}