// /app/medicines/page.tsx
import { ProductCard } from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Metadata } from "next";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  id: number;
  name: string;
  slug: string;
  price_per_unit: number | undefined;
  category?: string;
  generic_name?: string;
  image?: string; 
}

type SearchParams = {
  query?: string;
  page?: string;
};

// 🔒 SEO: noindex but allow follow
export const metadata: Metadata = {
  title: "Search Medicines Online | ParasiteHeal.com",
  description:
    "Quickly search and explore a wide range of medicines, generic drugs, and healthcare products. Find the right product and shop with ease.",
  robots: { index: false, follow: true },
};

async function fetchProducts(query: string, page: number, limit: number) {
  let url = "";
  if (!query) {
    url = `${BASE_API_URL}/products?page=${page}&limit=${limit}`;
  } else {
    url = `${BASE_API_URL}/products/search?page=${page}&limit=${limit}`;
    if (query) url += `&query=${encodeURIComponent(query)}`;
  }

  console.log("My URL: " + url);
  const res = await fetch(url, { cache: "no-store" }); // no-store for SSR
  if (!res.ok) {
    throw new Error("Failed to fetch Medicines");
  }
  return res.json();
}

export default async function ProductSearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParamsPromise;
  const query = resolvedSearchParams.query || "";
  const page = Number(resolvedSearchParams.page || 1);
  const limit = 12;

  if (!query) {
    return <p className="p-6">Please enter a search term.</p>;
  }

  try {
    const data = await fetchProducts(query, page, limit);
    const products: Product[] = data.products || [];
    const totalItems: number = data.pagination?.totalItems || products.length;
    const totalPages = Math.ceil(totalItems / limit);

    return (
      <main className="md:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-slate-700 text-xl md:text-2xl font-bold text-left flex">
          <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4"></div>
          Browse Medicines
        </h1>

        {products.length === 0 ? (
          <div className="mt-10 py-16 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center">
            <p className="text-gray-500 text-xl font-medium">
              No Medicines found
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              query={query}
            />
          </div>
        )}
      </main>
    );
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <p className="text-red-600 text-center bg-red-50 p-4 m-8 rounded">
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      </div>
    );
  }
}
