// app/medicines/category/[slug]/page.tsx
import Pagination from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { Metadata } from "next";
import sanitizeHtml from "sanitize-html";
import styles from "../../medicines/[slug]/ProductPage.module.css";

interface Product {
  id: number;
  name: string;
  slug: string;
  price_per_unit: number | undefined;
  category?: string;
}

const PAGE_SIZE = 12;
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

async function readJson<T>(response: Response, fallback: T): Promise<T> {
  try {
    const body = await response.text();
    if (!body) return fallback;
    return (JSON.parse(body) as T) ?? fallback;
  } catch {
    return fallback;
  }
}

// Enable dynamic params to generate pages on-demand after build
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const resCategories = await fetch(`${BASE_API_URL}/products/categories`, {
      cache: "no-store",
    });
    
    if (!resCategories.ok) {
      console.warn(`API returned status ${resCategories.status}, skipping static generation`);
      return [];
    }
    
    const categories = await readJson(resCategories, [] as { slug: string }[]);

    const paths: { slug: string; page: string }[] = [];

    for (const category of categories) {
      paths.push({
        slug: category.slug,
        page: (1).toString(),
      });
    }

    return paths;
  } catch (error) {
    console.warn("Failed to fetch categories for static generation:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const resCat = await fetch(`${BASE_API_URL}/products/category/${slug}`, {
      next: { revalidate: 3600 },
    });
    
    if (!resCat.ok) {
      return {
        title: slug,
        description: `Browse medicines in the ${slug} category`,
      };
    }
    
    const cat = await readJson(resCat, { metatitle: slug, metadata: "" });
    return {
      title: cat.metatitle as string,
      description: cat.metadata as string,
      alternates: {
        canonical: `/categories/${slug}`,
      },
    };
  } catch (error) {
    console.warn(`Failed to fetch metadata for category ${slug}:`, error);
    return {
      title: slug,
      description: `Browse medicines in the ${slug} category`,
    };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageNum = 1;

  const res = await fetch(
    `${BASE_API_URL}/products/category/${slug}/products?page=${pageNum}&limit=${PAGE_SIZE}`,
    { next: { revalidate: 3600 } }
  );
  const data = await readJson(res, { products: [], total: 0, totalPages: 1 });
  const resCat = await fetch(`${BASE_API_URL}/products/category/${slug}`, {
    next: { revalidate: 3600 },
  });
  const cat = await readJson(resCat, {
    description: "",
    name: slug,
    metadata: "",
  });
  const description = cat.description || "";
  const categoryName = cat.name || slug;
  const products: Product[] = data.products || [];
  console.log("Fetched products:", products);
  const total: number = data.total || products.length;
  const totalPages = data.totalPages || 1;

  const cleanHtml = sanitizeHtml(description, {
    allowedTags: [
      "style",
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "br",
      "a",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "section",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      "*": ["class"], // allow Tailwind / custom classes
    },
    disallowedTagsMode: "discard", // completely strip disallowed tags (like <style>, <script>)
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName || slug,
    description: cat.metadata || `Browse ${categoryName || slug} medicines`,
    url: `${SITE_URL}/categories/${slug}`,
  };

  return (
    <main className="md:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-slate-700 text-xl md:text-2xl font-bold text-left flex mb-6">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4"></div>
        {categoryName || slug} 
      </h1>

      <div className="max-w-full mx-auto ">
        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="mt-10 py-20 bg-white rounded-2xl shadow-sm border-2 border-dashed border-sky-200 text-center">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-sky-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-xl font-semibold mb-2">
              No Medicines Found
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-700">
                Available Medicines: <span className="text-sky-500">{total}</span> 
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 md:space-y-4">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="">
              <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                categorySlug={slug}
              />
            </div>
          </div>
        )}

        {cleanHtml && (
          <section className="mt-2 mx-4 md:mx-8">
            <div
              className={styles.productContent}
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          </section>
        )}
      </div>
    </main>
  );
}
