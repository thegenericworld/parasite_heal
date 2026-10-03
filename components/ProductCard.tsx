"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";

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
  price_per_unit?: number | string | undefined;
  image?: string;
  generic_name?: string;
  usa_brand_name?: string;
  unit_label?: string;
  product_variants?: ProductVariant[];
  categories?: string;
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  // Calculate min/max prices from variants if available
  const firstVariant = product.product_variants?.[0];
  const lastVariant = product.product_variants ? product.product_variants[product.product_variants.length - 1] : null;
  const maxPrice = firstVariant?.price_per_unit ? parseFloat(firstVariant.price_per_unit) : 0;
  const minPrice = lastVariant ? parseFloat(lastVariant.price_per_unit) : 0;
  
  // Fallback to simple price_per_unit if no variants
  const simplePrice = product.price_per_unit ? parseFloat(String(product.price_per_unit)) : 0;
  
  // Determine which price to show
  const hasVariants = product.product_variants && product.product_variants.length > 0;
  const displayPrice = hasVariants ? minPrice : simplePrice;
  const displayMaxPrice = hasVariants ? maxPrice : null;

  return (
    <article
      className="flex flex-col group cursor-pointer border border-gray-300 rounded-2xl p-3 sm:p-4 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-300"
      itemScope
      itemType="https://schema.org/Product"
    >
      <Link 
        href={`/medicines/${product.slug}`} 
        className="flex flex-col h-full"
        aria-label={`View ${product.name}`}
      >
        {/* Image Section */}
        <div className="relative w-full h-42 md:h-56 mb-3 rounded-xl overflow-hidden bg-white">
          <Image
            src={product.image || "/placeholder-medicine.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            priority={priority}
            itemProp="image"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col grow justify-between">
          <div>
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 
                className="text-gray-900 text-base md:text-lg font-bold leading-tight"
                itemProp="name"
              >
                {product.name}
              </h3>
            </div>
            
           {/* Brand & Generic Badges - Larger & higher contrast for readability */}
            <div className="flex flex-wrap gap-2 my-3">
              {product.usa_brand_name && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm  font-semibold bg-blue-100 text-blue-900 border border-blue-200">
                  {product.usa_brand_name}
                </span>
              )}
              {product.generic_name && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm  font-semibold bg-gray-100 text-gray-900 border border-gray-200">
                  {product.generic_name}
                </span>
              )}
            </div>
           
            <div 
              className="mt-3 flex flex-wrap items-baseline gap-1"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              {displayPrice > 0 ? (
                <>
                  <span 
                    className="text-gray-900 text-lg md:text-xl font-bold"
                    itemProp="price"
                    content={displayPrice.toFixed(2)}
                  >
                    {displayMaxPrice ? `$${displayPrice.toFixed(2)} - ${displayMaxPrice.toFixed(2)}` : `$${displayPrice.toFixed(2)}`}
                  </span>
                  <span className="text-gray-800 text-sm md:text-base font-medium">{product.unit_label ? `${product.unit_label}` : "/ unit"}</span>
                  <meta itemProp="priceCurrency" content="USD" />
                </>
              ) : (
                <span className="text-gray-900 text-lg md:text-xl font-bold">
                  Contact for pricing
                </span>
              )}
            </div>
          </div>

          {/* Explicit visual button for clear affordance */}
          <div className="mt-4 w-full bg-[#0080C1] text-white text-center py-2.5 rounded-full font-bold text-base md:text-lg group-hover:bg-[#00699E] transition-colors shadow-[0_12px_26px_-14px_rgba(0,128,193,0.9)] flex items-center justify-center gap-2">
            See Options
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </Link>
    </article>
  );
};