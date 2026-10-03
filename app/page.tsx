import Content from "@/components/LendingPage/Content";
import ShopByCategory from "@/components/LendingPage/Categories";
import Hero from "@/components/LendingPage/Hero";
import { Metadata } from "next";
import Products from "@/components/LendingPage/4ProductsCard";
import FeaturedReviews from "@/components/LendingPage/FeaturedReviews";
import TrustBanner from "@/components/LendingPage/TrustBanner";

const SITE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

export const metadata: Metadata = {
    title: "Buy Generic Medicines Online in USA - Parasite Heal",
    description:
        "Order generic medicines online with up to 90% savings. Fast worldwide shipping for ED pills, heart medicine, inhalers, diabetes drugs & more at Parasite Heal.",
    alternates: {
        canonical: `${SITE_URL}/`,
    },
    keywords: ["online pharmacy", "generic medicines", "buy medicines online", "cheap medicines", "Parasite Heal", "ED pills", "Ivermectin", "Inhalers", "Generic Viagra",
        "Generic Cialis"],
    openGraph: {
        title: "Save up to 90% on Medications | ParasiteHeal",
        description: "Don't overpay for brand names. Get FDA-approved generics delivered to your door.",
        url: "/",
        type: "website",
        siteName: "Parasite Heal",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Parasite Heal - Trusted Online Pharmacy",
        description: "Order affordable generic medicines online with worldwide shipping.",
    },
    robots: {
        index: true, follow: true, googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

};

const slugs_ivm: string[] = [
    "ivercor-12-mg",
    "ivercor-6-mg",
    "ivercor-3-mg",
    "ivrea-cream",
];

const slugs_2: string[] = [
    "vidalista-60mg",
    "cenforce-200mg",
    "vilitra-20mg",
    "fildena-50-mg-sildenafil",
];

// const slugs_3: string[] = [
//   "seroflo-inhaler-25-mcg-125-mcg-advair-inhaler",
//   "levolin-50-mcg-200mdi-inhaler",
//   "tiova-rotacaps-18-mcg",
//   "foracort-inhaler-6-200-mcg",
// ];

const slugs_4: string[] = [
    "a-ret-gel-0-05-20-gm",
    "hcqs-300-mg-tablet-plaquenil",
    "careprost-3-ml-of-0-03-bimatoprost-ophthalmic-solution",
    "mebex-100mg-vermox",
];

const slugs_fenben: string[] = [
    "wormentel-150-mg",
    "wormentel-444-mg",
    "wormentel-500-mg",
    "wormentel-1000-mg",
];

// const slugs_6: string[] = [
//   "forxiga-10mg-tablet",
//   "linacord-5-tablet",
//   "pglitz-15-mg",
//   "istamet-50-mg-500-mg-tablet-janumet",
// ]


export default async function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "Parasite Heal",
                "url": SITE_URL,
                "logo": `${SITE_URL}/logo.png`,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-555-0123",
                    "contactType": "customer service"
                }
            },
            {
                "@type": "WebSite",
                "name": "Parasite Heal",
                "url": SITE_URL,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${SITE_URL}/medicines/search?query={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    };

    return (
        <main className="antialiased">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero />
            <Products data={slugs_ivm} categories="Ivermectin" to="/medicines/search?query=ivermectin&page=1" />
            <Products data={slugs_fenben} categories="Fenbendazole" to="/medicines/search?query=fenbendazole&page=1" />

            <ShopByCategory />

            <Products data={slugs_4} categories="Popular Medicines" to="/medicines" />

            {/* Placed here rather than above ShopByCategory: a reader who has just
                scrolled past four products is deciding whether to buy, which is the
                moment the fulfilment process actually answers a live question. */}
            <TrustBanner />

            {/* <Products data={slugs_6} categories="Diabetic Medicines" to="/categories/diabetes" />
      <Products categories="Asthma Inhalers" to="/categories/asthma" data={slugs_3} /> */}
            <Products data={slugs_2} categories="Erectile Dysfunction (ED)" to="/mens-health" />

            <FeaturedReviews />

            <Content />
        </main>
    );
}
