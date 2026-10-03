"use client";

import { useEffect, useState } from "react";

const LOCAL_STORAGE_CART_KEY = "guest_cart_items";

interface Product {
  id: string;
  name: string;
  description: string;
  categories: string[];
  slug: string;
  sku: string;
  generic_name?: string;
  usa_brand_name?: string;
  strength: string;
  manufacturer: string;
  packaging: string;
  product_variants: ProductVariant[];
  html: string;
  unit_label?: string;
}

interface ProductVariant {
  id: string;
  pack_size: string;
  price: number;
  price_per_unit: string;
}

interface LocalCartItem {
  product_variant_id: number;
  quantity: number;
}

interface PopupNotification {
  show: boolean;
  message: string;
  type: "success" | "error";
}

// --- SUB-COMPONENT: The Selectable Row (Pure Presentational) ---
function TableVariantRow({
  variant,
  isSelected,
  onSelect,
  isBestValue,
}: {
  variant: ProductVariant;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue: boolean;
}) {
  return (
    <tr
      onClick={onSelect}
      className={`
        hidden md:table-row cursor-pointer transition-all duration-200 border-b
        ${isSelected ? "bg-green-50/60 border-green-500 relative z-10" : "bg-white border-gray-100 hover:bg-gray-50"}
      `}
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? "border-green-600 bg-white" : "border-gray-300 bg-gray-50"
              }`}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
          </div>

          <div className="flex flex-col">
            <span className={`font-medium text-base ${isSelected ? "text-green-900" : "text-gray-900"}`}>
              {variant.pack_size}
            </span>
          </div>

          {isBestValue && (
            <span className="bg-green-600 text-white text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-bold shadow-sm ml-2">
              Best Value
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-5">
        <span className={`font-semibold text-base ${isSelected ? "text-green-700" : "text-gray-600"}`}>
          ${Number(variant.price_per_unit).toFixed(2)}
        </span>
      </td>

      <td className="px-6 py-5">
        <span className={`font-bold text-lg ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
          ${Number(variant.price).toFixed(2)}
        </span>
      </td>
    </tr>
  );
}

function MobileVariantCard({
  variant,
  isSelected,
  onSelect,
  isBestValue,
  unit_type,
}: {
  variant: ProductVariant;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue: boolean;
  unit_type: string;
}) {
  return (
    <div className="block md:hidden">
      <div
        onClick={onSelect}
        className={`
          relative border-2 transition-all duration-200 overflow-hidden cursor-pointer rounded-xl mb-2
          ${isSelected ? "border-green-500 bg-green-50/30 shadow-md" : "border-gray-200  "}
        `}
      >
        {isBestValue && (
          <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
            BEST VALUE
          </div>
        )}

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-green-600 bg-white" : "border-gray-300 bg-gray-50"
                }`}
            >
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
            </div>
            <div>
              <p className={`font-bold text-sm ${isSelected ? "text-green-900" : "text-gray-900"}`}>
                {variant.pack_size}
              </p>
              <p className="text-xs text-gray-500">
                ${Number(variant.price_per_unit).toFixed(2)} {unit_type}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg text-gray-900">${Number(variant.price).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function ProductDetails({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupNotification>({
    show: false,
    message: "",
    type: "success",
  });

  // --- 1. SELECTION STATE ---
  // Default to the first variant, or handle empty array
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  // Find the variant with the lowest price per unit (Best Value)
  const bestValueVariantIndex = product.product_variants.reduce((bestId, variant, index) => {
    const currentPricePerUnit = Number(variant.price_per_unit);
    const bestPricePerUnit = Number(product.product_variants[bestId].price_per_unit);
    return currentPricePerUnit < bestPricePerUnit ? index : bestId;
  }, 0);

  // Initialize selection on load
  useEffect(() => {
    if (product.product_variants.length > 0) {
      // Default to "Best Value" variant or the first one
      setSelectedVariant(product.product_variants[bestValueVariantIndex]);
    }
  }, [product, bestValueVariantIndex]);


  // Auto-hide popup
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup((prev) => ({ ...prev, show: false }));
      }, 3000); // Reduced to 3s for better UX
      return () => clearTimeout(timer);
    }
  }, [popup.show]);

  const [guestCart, setGuestCart] = useState<LocalCartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
      } catch (e) {
        console.error("Failed to parse guest cart", e);
        return [];
      }
    }
    return [];
  });

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ show: true, message, type });
  };

  // --- 2. LIFTED ADD TO CART LOGIC ---
  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setLoading(true);
    const variantId = selectedVariant.id;
    const quantity = 1; // Default to 1 pack

   
      try {
        const existingItemIndex = guestCart.findIndex(
          (item) => item.product_variant_id === Number(variantId)
        );

        let updatedCart;
        if (existingItemIndex > -1) {
          updatedCart = guestCart.map((item, index) =>
            index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          updatedCart = [...guestCart, { product_variant_id: Number(variantId), quantity }];
        }

        setGuestCart(updatedCart);
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedCart));
        showPopup("Product added to cart successfully!", "success");
      } catch (e) {
        console.error("Error adding to guest cart:", e);
        showPopup("Failed to add product to cart. Please try again.", "error");
      } finally {
        setLoading(false);
      }
  };

  if (product.product_variants.length === 0) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <h3 className="text-sm font-semibold text-red-800">Out of Stock</h3>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Popup Notification */}
      {popup.show && (
        <div className="fixed top-5 left-5 right-5 sm:top-6 sm:right-6 sm:left-auto sm:max-w-lg z-50 animate-slide-in-down">
          <div
            className={`relative px-5 py-4 rounded-2xl shadow-xl border overflow-hidden ${popup.type === "success" ? "border-green-200 bg-white" : "border-red-200 bg-white"
              }`}
          >
            <div className="flex items-center">
              <div className="shrink-0">
                {popup.type === "success" ? (
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="h-[18px] w-[18px] text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="h-[18px] w-[18px] text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-base font-semibold text-gray-900">{popup.message}</p>
                {popup.type === "success" && (
                  <div className="mt-2 flex gap-2">
                    <a href="/cart" className="text-sm text-green-700 hover:text-green-800 font-semibold">View Cart</a>
                    <span className="text-sm text-gray-400">•</span>
                    <a href="/checkout" className="text-sm text-green-600 hover:text-green-700 font-semibold">Checkout</a>
                  </div>
                )}
              </div>
              <button onClick={() => setPopup((prev) => ({ ...prev, show: false }))} className="ml-4 text-gray-400 hover:text-gray-600">
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SELECTION TABLE / LIST --- */}
      <div className="mt-4 md:mt-6">
        {/* Desktop Header */}
        <div className="hidden md:block overflow-x-auto rounded-t-lg border-t border-x border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-6 py-4 w-[40%]">Pack Size</th>
                <th className="px-6 py-4 w-[30%]">Price {product.unit_label}</th>
                <th className="px-6 py-4 w-[30%]">Total Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {product.product_variants.map((variant, index) => (
                <TableVariantRow
                  key={variant.id}
                  variant={variant}
                  isSelected={selectedVariant?.id === variant.id}
                  onSelect={() => setSelectedVariant(variant)}
                  isBestValue={index === bestValueVariantIndex}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List (Items rendered by Sub-Component via the map above) */}
        <div className="md:hidden w-full rounded-lg ">
          {product.product_variants.map((variant, index) => (
            <MobileVariantCard
              key={variant.id}
              variant={variant}
              isSelected={selectedVariant?.id === variant.id}
              onSelect={() => setSelectedVariant(variant)}
              isBestValue={index === bestValueVariantIndex}
              unit_type={product.unit_label || ""}
            />
          ))}
        </div>
      </div>

      {/* --- 3. STICKY ACTION BAR (THE "ADD TO CART" AREA) --- */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200  sticky bottom-0 z-40 md:static">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: Summary of what is selected */}
          <div className="text-center sm:text-left w-full sm:w-auto">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Selected Package</p>
            {selectedVariant ? (
              <div className="flex items-baseline justify-center sm:justify-start gap-2">
                <span className="text-2xl font-bold text-gray-900">{selectedVariant.pack_size}</span>
                <span className="text-lg text-gray-600">for ${Number(selectedVariant.price).toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-gray-400 italic">Select an option above</span>
            )}
          </div>

          {/* Right: The Main Button */}
          <button
            onClick={handleAddToCart}
            disabled={loading || !selectedVariant}
            className={`
              w-full sm:w-auto min-w-60 flex items-center justify-center gap-2 
              bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
              text-white text-base font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-200 active:scale-[0.98] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}