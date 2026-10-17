import type { Metadata } from "next";
import Link from "next/link";
import Products from "@/components/LendingPage/4ProductsCard";

export const metadata: Metadata = {
    title: "Shop Medicines",
    description:
        "Browse selected antiparasitic medicines and treatments from Parasite Heal.",
};

const slugs_ivm: string[] = [
    "ivercor-12-mg",
    "ivercor-6-mg",
    "ivercor-3-mg",
    "ivrea-cream",
];

const slugs_fenben: string[] = [
    "wormentel-150-mg",
    "wormentel-444-mg",
    "wormentel-500-mg",
    "wormentel-1000-mg",
];

const slugs_hcqs: string[] = [
    "hcqs-200-mg-plaquenil",
    "hcqs-300-mg-tablet-plaquenil",
    "hcqs-400-mg-tablet-plaquenil",
    "hqtor-tablet",
];

const slugs_mebex: string[] = [
    "mebex-100mg-vermox",
    "mebendazole-200-mg",
    "mebex-500-mg-tablet-vermox",
    "mebex-suspension-30-ml-vermox",
];

const categories = [
    { label: "Ivermectin", href: "#ivermectin" },
    { label: "Fenbendazole", href: "#fenbendazole" },
    { label: "Hydroxychloroquine", href: "#hydroxychloroquine" },
    { label: "Mebendazole", href: "#mebendazole" },
];

const Page = () => {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                            Medicines
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Straightforward access to the treatments you need.
                        </h1>
                        {/* <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Browse our most requested medicines by category. Each product page
                            includes pack sizes, pricing, and ordering information.
                        </p> */}
                    </div>

                    <nav
                        aria-label="Medicine categories"
                        className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                    >
                        {categories.map((category) => (
                            <Link
                                key={category.href}
                                href={category.href}
                                className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                {category.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </section>

            <div className="mx-auto max-w-7xl divide-y divide-slate-200 px-0 sm:px-2 lg:px-4">
                <div id="ivermectin" className="scroll-mt-6">
                    <Products
                        data={slugs_ivm}
                        categories="Ivermectin"
                        to="/medicines/search?query=ivermectin&page=1"
                    />
                </div>
                <div id="fenbendazole" className="scroll-mt-6">
                    <Products
                        data={slugs_fenben}
                        categories="Fenbendazole"
                        to="/medicines/search?query=fenbendazole&page=1"
                    />
                </div>
                <div id="hydroxychloroquine" className="scroll-mt-6">
                    <Products
                        data={slugs_hcqs}
                        categories="Hydroxychloroquine (HCQs)"
                        to="/medicines/search?query=hydroxychloroquine&page=1"
                    />
                </div>
                <div id="mebendazole" className="scroll-mt-6">
                    <Products
                        data={slugs_mebex}
                        categories="Mebendazole"
                        to="/medicines/search?query=mebendazole&page=1"
                    />
                </div>
            </div>
        </main>
    );
};

export default Page;