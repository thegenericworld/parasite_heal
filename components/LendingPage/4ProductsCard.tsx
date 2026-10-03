
import Link from "next/link";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { ProductCard } from "@/components/ProductCard";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

type ProductsProps = {
  data: string[];
  categories: string;
  to: string;
};

interface ProductVariant {
  id: number;
  pack_size: string;
  price: string;
  price_per_unit: string;
  product_id: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  categories: string;
  image: string;
  product_variants: ProductVariant[];
  generic_name?: string;
  usa_brand_name?: string;
  unit_label?: string;
}

const fetchProducts = async (slugs: string[]): Promise<Product[]> => {
  if (!BASE_API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return [];
  }
  try {
    const responses = await Promise.allSettled(
      slugs.map((slug) => axios.get<Product>(`${BASE_API_URL}/products/${slug}`))
    );
    return responses
      .filter((res): res is PromiseFulfilledResult<AxiosResponse<Product>> => res.status === "fulfilled")
      .map((res) => res.value.data)
      .filter((data): data is Product => !!data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const Products = async ({ data, categories, to }: ProductsProps) => {
  const products: Product[] = await fetchProducts(data);

  if (products.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Products Temporarily Unavailable</h2>
          <p className="text-gray-500 mb-6">We couldn&apos;t load products for <strong>{categories}</strong> right now.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  const normalizedTo = to.startsWith("/") ? to : `/${to}`;

  return (
    <section className="w-full max-w-7xl mx-auto px-3 md:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-4 gap-4">
        <div>
          <h2 className="text-slate-900 text-xl md:text-2xl  font-black tracking-tight">
            {categories}
          </h2>
        </div>
        <Link
          href={normalizedTo}
          className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-sky-600 border border-sky-200 bg-sky-50 hover:bg-sky-100 hover:border-sky-300 px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
        >
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {products.map((product, index) => (
          <ProductCard 
            key={product.slug || product.id} 
            product={product} 
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;