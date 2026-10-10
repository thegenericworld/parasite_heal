
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import type { AxiosResponse } from "axios";

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

const ProductCard = ({ data, priority = false }: { data: Product; priority?: boolean }) => {
  const firstVariant = data.product_variants?.[0];
  const pricePerUnit = firstVariant?.price_per_unit ? parseFloat(firstVariant.price_per_unit) : 0;

  // More realistic pricing: 40-60% savings is common for generics
  const savingsPercent = 60;
  const originalPrice = pricePerUnit > 0 ? (pricePerUnit / (1 - savingsPercent / 100)).toFixed(2) : "0.00";

  return (
    <article
      className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300"
      itemScope
      itemType="https://schema.org/Product"
    >
      <Link 
        href={`/medicines/${data.slug}`} 
        className="flex flex-col h-full"
        aria-label={`View ${data.name} - $${pricePerUnit.toFixed(2)} per unit`}
      >
        {/* Image Section */}
        <div className="relative bg-linear-to-b from-slate-50 to-white p-4 md:p-6">
          <div className="relative w-full h-40 md:h-48 group-hover:scale-105 transition-transform duration-500">
            <Image
              src={data.image || "/placeholder-medicine.png"}
              alt={data.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain"
              priority={priority}
              itemProp="image"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 md:p-4 flex flex-col grow">
          {/* Product Name */}
          <h3 
            className="text-gray-800 group-hover:text-blue-600 text-sm md:text-base font-bold transition-colors line-clamp-2 text-center mb-2"
            itemProp="name"
          >
            {data.name}
          </h3>

          {/* Brand & Generic Badges */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {data.usa_brand_name && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {data.usa_brand_name}
              </span>
            )}
            {data.generic_name && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {data.generic_name}
              </span>
            )}
          </div>

          {/* Pricing Section */}
          <div 
            className="bg-linear-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100 mt-auto"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            {pricePerUnit > 0 ? (
              <>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span 
                    className="text-blue-700 text-xl md:text-2xl font-extrabold"
                    itemProp="price"
                    content={pricePerUnit.toFixed(2)}
                  >
                    ${pricePerUnit.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">{data.unit_label}</span>
                  <meta itemProp="priceCurrency" content="USD" />
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-gray-400 text-sm line-through">${originalPrice}</span>
                  <span className="text-green-600 text-xs font-bold">Save {savingsPercent}%</span>
                </div>
              </>
            ) : (
              <span className="text-gray-500 text-sm font-medium block text-center">
                Contact for pricing
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* CTA Button */}
      <div className="p-3 pt-0">
        <Link
          href={`/medicines/${data.slug}`}
          className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 md:py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs md:text-base active:scale-[0.98]"
        >
          <span>Get Best Price</span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
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
      <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-1 h-10 md:h-12 bg-linear-to-b from-blue-500 to-blue-600 rounded-full" />
          <div>
            <h2 className="text-gray-800 text-xl md:text-2xl lg:text-3xl font-bold">
              {categories}
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">
              Top rated & trusted treatments
            </p>
          </div>
        </div>

        <Link
          href={normalizedTo}
          className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg shrink-0 active:scale-95"
        >
          <span className="hidden sm:inline">View All</span>
          <span className="sm:hidden">All</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.slug || product.id} 
            data={product} 
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;