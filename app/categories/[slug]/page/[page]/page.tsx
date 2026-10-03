// medicines/category/[slug]/page/[page]/page.tsx
import Pagination from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { Metadata } from "next";

interface Product {
  id: number;
  name: string;
  slug: string;
  price_per_unit: number | undefined;
  category?: string;
}

const PAGE_SIZE = 12;
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Enable dynamic params to generate pages on-demand after build
export const dynamicParams = true;

// ✅ Add metadata to handle noindex for page > 1
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: "noindex, follow",
    alternates: {
      canonical: `/categories/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  // Pre-render page 2 for all categories at build time
  // All other pagination pages will be generated on-demand (ISR)
  const resCategories = await fetch(`${BASE_API_URL}/products/categories`, { cache: "no-store" });
  
  if (!resCategories.ok) {
    return [];
  }
  
  const categories = await resCategories.json();
  
  // Generate only page 2 for each category
  const paths = categories.map((category: { slug: string }) => ({
    slug: category.slug,
    page: "2",
  }));

  return paths;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const pageNum = parseInt(page || "2");

  const res = await fetch(
    `${BASE_API_URL}/products/category/${slug}/products?page=${pageNum}&limit=${PAGE_SIZE}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour with ISR
  );
  const data = await res.json();
  const products: Product[] = data.products || [];
  const totalPages = data.totalPages || 1;

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            categorySlug={slug}
          />
        </div>
      )}
    </main>
  );
}