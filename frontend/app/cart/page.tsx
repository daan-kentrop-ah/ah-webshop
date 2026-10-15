import PageHeader from "@/components/page-header";
import CartList from "@/components/cart-list";

export default function CartPage() {
    return (
        <>
            <PageHeader title={"Jouw winkelmandje"} subtitle={"Zie hier het overzicht met producten in jouw winkelmandje"}/>

            <CartList/>
        </>

    )
}