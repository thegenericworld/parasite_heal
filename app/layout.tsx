import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Headers";
import Footer from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { NavigationProvider } from "@/contexts/NavigationContext";
import PageLoaderScreen from "@/components/PageLoaderScreen";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import SecurityShield from "./SecurityShield";
import Script from "next/script";


// Configure the font
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-jakarta", // Define a CSS variable
});


const BASE_URL: string = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Order Medicines Online in USA - Parasite Heal",
        template: "%s | Parasite Heal",
    },
    description:
        "Buy Diabetes, Heart & B.P. Medicines, Sildenafil, Inhalers, and more at low prices. Shop safe with trusted service all over the world.",
    openGraph: {
        type: "website",
        siteName: "Parasite Heal",
        url: BASE_URL,
        title: "Parasite Heal - Affordable Generic Medicines Online",
        description:
            "Buy Diabetes, Heart & B.P. Medicines, Sildenafil, Inhalers, and more at low prices. Shop safe with trusted service all over the world.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Parasite Heal - Affordable Generic Medicines Online",
        description:
            "Buy Diabetes, Heart & B.P. Medicines, Sildenafil, Inhalers, and more at low prices. Shop safe with trusted service all over the world.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <head>
                {/* <link rel="apple-touch-icon" sizes="60x60" href="/apple-60x60.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-152x152.png" /> */}
            </head>
            <body className={jakarta.className}>
                <SecurityShield />
                <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
                    <NavigationProvider>
                        <Header></Header>
                        <Suspense fallback={<PageLoaderScreen />}>
                            {children}
                        </Suspense>
                        <Footer></Footer>
                        <FloatingChat />
                        <Script
                            src="https://analytics.reliablechemist.com/script.js"
                            data-website-id="b5641635-a0fa-4879-8356-135d4e2609dd"
                            strategy="afterInteractive"
                        />
                    </NavigationProvider>
                </Suspense>
            </body>
        </html>
    );
}
