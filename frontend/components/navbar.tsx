"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaShoppingCart} from "react-icons/fa";

export default function NavBar() {
    const currentPath = usePathname();

    const isActivePath = (activePath: string, path: string) => {
        return activePath === path;
    };

    return (
        <header className={"shadow-md p-4 w-full bg-white flex flex-row items-baseline"}>
            <h1 className={"text-sky-500 font-extrabold text-2xl mr-8"}>Albert Heijn Webshop</h1>
            <nav className={"flex flex-row items-center flex-1"}>
                <div className="flex-1">
                    <NavbarLink href={"/"} isActive={isActivePath(currentPath, "/")} label={"Producten"}/>
                </div>
                <NavbarLink href={"cart"} isActive={isActivePath(currentPath, "/cart")}
                            label={<FaShoppingCart size={24} className={"text-sky-500 hover:text-orange-500"}/>}/>
            </nav>

        </header>
    )
}

function NavbarLink({href, isActive, label}: { href: string, isActive: boolean, label: React.ReactNode }) {
    return (
        <Link href={href}
              className={`font-bold text-sky-500 hover:text-orange-500 hover:border-orange-500 border-b-2 ${isActive ? "border-sky-500" : "border-transparent"}`}>
            {label}
        </Link>
    )
}