import ProductDetails from "@/components/ProductPricingCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { FaHome, FaChevronRight } from "react-icons/fa";
import styles from "./ProductPage.module.css";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://reliablechemist.com";

interface Product {
  id: string;
  name: string;
  description: string;
  categories: string[];
  sku: string;
  slug: string;
  generic_name?: string;
  usa_brand_name?: string;
  strength: string;
  manufacturer: string;
  packaging: string;
  product_variants: ProductVariant[];
  html: string;
  image: string;
  meta?: string;
}

interface ProductVariant {
  id: string;
  pack_size: string;
  price: number;
  price_per_unit: string;
}

// Enable dynamic params to generate pages on-demand after build
export const dynamicParams = true;

export async function generateStaticParams() {
  // Only pre-render the top 50 most popular products at build time
  // The rest will be generated on-demand (ISR) when first requested
  const res = await fetch(`${BASE_API_URL}/products/slugs`, {
    cache: "no-store",
  });
  if (!res.ok) {
    // Return empty array to allow all pages to be generated on-demand
    return [];
  }
  const slugs = await res.json();
  // Limit to first 50 products on the frontend
  return slugs.slice(0, 50).map((item: { slug: string }) => ({
    slug: String(item.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return notFound();
  const product = await getProductBySlug(slug);

  if (!product) return {};

  const metaDesc = product.meta || `Buy ${product.name} online. Trusted generic at unbeatable prices with fast worldwide delivery from Reliable Chemist.`;

  return {
    title: `Buy ${product.name} Online - Affordable & Fast Delivery`,
    description: metaDesc,
    alternates: {
      canonical: `/medicines/${slug}`,
    },
    openGraph: {
      type: "website",
      siteName: "Reliable Chemist",
      title: product.name,
      description: metaDesc,
      url: `${SITE_URL}/medicines/${slug}`,
      images: [{ url: product.image, alt: product.name, width: 800, height: 600 }],
    },
  };
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_API_URL}/products/${slug}`, { next: { revalidate: 3600 } }); // Add revalidation
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // Sanitize HTML
  const cleanHtml = sanitizeHtml(product.html, {
    allowVulnerableTags: true,
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "section", "img", "span", "div"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "style"],
    },
  });

  const prices = (product.product_variants || [])
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price));
  const lowPrice = prices.length ? Math.min(...prices) : 0;
  const highPrice = prices.length ? Math.max(...prices) : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.meta || product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.usa_brand_name || product.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: product.manufacturer,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      lowPrice,
      highPrice,
      offerCount: prices.length,
      url: `${SITE_URL}/medicines/${slug}`,
    },
  };

   return <main className="bg-white min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs - Minimal, Refined */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2.5 flex flex-wrap items-center gap-y-1 text-sm md:text-base text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-medium min-h-[24px]">
            <FaHome className="text-slate-500" size={14} /> Home
          </Link>
          <FaChevronRight className="mx-2 text-slate-400" size={12} />
          <Link href="/medicines" className="hover:text-slate-900 transition-colors font-medium min-h-[24px]">
            Medicines
          </Link>
          <FaChevronRight className="mx-2 text-slate-400" size={12} />
          <span className="text-slate-800 font-medium truncate">{product.name}</span>
        </div>
      </nav>

      {/* Hero Section: Product Details & Image */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">

          {/* Left: Product Image (2 cols) - APPEARS FIRST ON ALL VIEWS */}
          <div className="md:col-span-2 order-first">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-200 rounded-2xl flex items-center justify-center aspect-square relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right: Product Details (3 cols) */}
          <div className="md:col-span-3 order-last">
            {/* Product Name & Meta */}
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                {product.name}
              </h1>
              {product.generic_name && (
                <p className="text-base md:text-lg text-slate-700">
                  <span className="font-medium">Active Ingredient:</span>{" "}
                  <span className="font-bold text-sky-700">{product.generic_name}</span>
                </p>
              )}
            </div>

            {/* Purchase Section */}
            <div className="border-t border-slate-200">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Section */}
      {(product.usa_brand_name || product.manufacturer || product.strength || cleanHtml) && (
        <section className="bg-slate-50 border-t border-slate-200 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">

            {/* Specification Cards - Refined */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {product.usa_brand_name && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Brand Equivalent</div>
                  <p className="text-lg md:text-xl font-bold text-slate-900">{product.usa_brand_name}</p>
                </div>
              )}
              {product.manufacturer && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Manufacturer</div>
                  <p className="text-lg md:text-xl font-bold text-slate-900">{product.manufacturer}</p>
                </div>
              )}
              {product.strength && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Strength</div>
                  <p className="text-lg md:text-xl font-bold text-slate-900">{product.strength}</p>
                </div>
              )}
            </div>

            {/* Product Content - Styled with CSS Module */}
            {cleanHtml && (
              <div className={styles.productContent}>
                <h2>Product Information</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trust & Service Section */}
      <section className="bg-white border-t border-slate-200 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 md:mb-12 border-b border-slate-200 pb-4">Our Commitment to You</h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {/* Left Column - Text-heavy */}
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Medications</h3>
                  <p className="text-base text-slate-700 leading-relaxed">Every product is sourced directly from licensed manufacturers and verified for authenticity. We stand behind every medicine we sell.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Discreet & Secure</h3>
                  <p className="text-base text-slate-700 leading-relaxed">We respect your privacy with plain, unmarked packaging. All orders are encrypted and protected with industry-standard security.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Continue list */}
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fast Worldwide Shipping</h3>
                  <p className="text-base text-slate-700 leading-relaxed">Orders ship within 2-3 days and deliver globally. Track your package in real-time from dispatch to your door.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Unbeatable Prices</h3>
                  <p className="text-base text-slate-700 leading-relaxed">Save up to 60% compared to brand-name medications. We pass manufacturer savings directly to you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-16 border-t border-slate-200">
          <p className="text-base text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Medical Disclaimer:</strong> The information provided on this page is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical concerns before starting any new medication.
          </p>
      </div>

    </main>;
  }
 