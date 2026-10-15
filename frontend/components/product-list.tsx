"use client"
import {useQuery} from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import {useState} from "react";
import {SkeletonCard} from "@/components/product-card-skeleton";
import {Field} from "@/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupInput, InputGroupText} from "@/components/ui/input-group";
import {Button} from "@/components/ui/button";
import {FaCross, FaQuestion} from "react-icons/fa6";
import {FaTimes} from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";

export interface Product {
    id: number;
    name: string;
    priceInCents: number;
    imageUrl: string;
}

async function getProducts(): Promise<Product[]> {
    const res = await fetch('/api/products');

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
}

export default function ProductList() {
    const {data: products, isLoading, isError} = useQuery({queryKey: ['products'], queryFn: getProducts});
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortoption] = useState<typeof sortOptions[number]["value"]>("no-sort");

    const productList = products ? products : [];

    const sortedProducts = sortOption === "no-sort" ? productList : [...productList].sort((a, b) => {
        if(sortOption === "price-asc"){
            return a.priceInCents - b.priceInCents
        } else {
            return b.priceInCents - a.priceInCents
        }
    });

    const filteredProducts = [...sortedProducts].filter((product: Product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));


    const sortOptions = [
            {
                label: "Niet sorteren",
                value: "no-sort"
            }, {
                label: "Prijs laag naar hoog",
                value: "price-asc"
            },
            {
                label: "Prijs hoog naar laag",
                value: "price-desc"
            }
        ];

    return (
        <section className={"max-w-[1000px] mx-auto"}>
            <div className="flex flex-col  md:flex-row md:items-center gap-4">
                <Field>
                    <InputGroup>
                        <InputGroupInput placeholder="Type om producten te zoeken..." value={searchTerm}
                                         onChange={(e) => setSearchTerm(e.target.value)}/>
                        {searchTerm != "" && (
                            <InputGroupAddon align="inline-end">
                                <Button onClick={() => {
                                    setSearchTerm("")
                                }} variant="ghost" size="icon">
                                    <FaTimes/>
                                </Button>
                            </InputGroupAddon>
                        )}

                    </InputGroup>
                </Field>

                <Select items={sortOptions} defaultValue={"no-sort"} value={sortOption} onValueChange={(value)=>{setSortoption(value ? value : "no-sort")}}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sorteren</SelectLabel>
                            {sortOptions.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {isLoading && [1, 2, 3, 4, 5].map((number) => {
                    return <SkeletonCard key={number}/>
                })}

                { !isLoading && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                        return <ProductCard key={product.id} product={product}/>
                    })
                ) : (
                    <div className={"flex items-center justify-center col-span-3"}>
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FaQuestion/>
                                </EmptyMedia>
                                <EmptyTitle>Geen producten gevonden</EmptyTitle>
                                <EmptyDescription>Probeer een andere zoekopdracht</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button  onClick={() => {
                                    setSearchTerm("")
                                }} variant={"outline"}>Reset filters</Button>
                            </EmptyContent>
                        </Empty>
                    </div>

                )}
            </div>

        </section>

    )
}


