import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { cn } from "@/lib/utils";
import {ReactQueryProvider} from "@/providers/react-query-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AH Webshop",
    description: "Check het assortiment van Albert Heijn",
};


export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
        >
            <ReactQueryProvider>
                <body className="min-h-full flex flex-col">
                    <NavBar/>
                    <div className="p-8">
                        {children}
                    </div>
                </body>
            </ReactQueryProvider>
        </html>
    );
}
