"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCheckout } from "@/contexts/CheckoutContext";

const LOCAL_STORAGE_CART_KEY = "guest_cart_items";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
const DELIVERY_FEE = 30; // Flat delivery fee for orders under $199
const CRYPTO_DISCOUNT_PERCENTAGE = 20; // 20% discount for crypto payments
const BANK_DISCOUNT_PERCENTAGE = 20; // 20% discount for bank payments

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  pack_size: string;
  price: number;
  product_variant_id: number;
  strength?: string;
}

interface GuestCartResponse {
  name: string;
  price: number;
  pack_size: string;
  product_variant_id: number;
  strength?: string;
}

interface LocalCartItem {
  product_variant_id: string;
  quantity: number;
}

export default function CartSummary() {
  const { paymentMethod, setOrderTotal, couponValidation } = useCheckout();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      try {

        const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        if (!storedCart) {
          setCart([]);
          return;
        }

        const parsedCart: LocalCartItem[] = JSON.parse(storedCart);
        const variantIds = parsedCart.map((item) => item.product_variant_id);

        const { data } = await axios.post(`${BASE_API_URL}/cart/guest`, {
          variantIds,
        });

        const enrichedCart: CartItem[] = data.map(
          (item: GuestCartResponse) => {
            const localItem = parsedCart.find(
              (i) =>
                Number(i.product_variant_id) === item.product_variant_id
            );
            return {
              id: item.product_variant_id,
              name: item.name,
              quantity: localItem?.quantity || 1,
              price: item.price,
              pack_size: item.pack_size,
              product_variant_id: item.product_variant_id,
              strength: item.strength,
            };
          }
        );

        setCart(enrichedCart);
      } catch (error) {
        console.error("Failed to load cart summary", error);
        setError("Unable to load cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Payment method discount
  let paymentMethodDiscount = 0;
  let paymentMethodDiscountPercentage = 0;

  if (paymentMethod === 'crypto') {
    paymentMethodDiscount = subtotal * (CRYPTO_DISCOUNT_PERCENTAGE / 100);
    paymentMethodDiscountPercentage = CRYPTO_DISCOUNT_PERCENTAGE;
  }
  if (paymentMethod === 'bank') {
    paymentMethodDiscount = subtotal * (BANK_DISCOUNT_PERCENTAGE / 100);
    paymentMethodDiscountPercentage = BANK_DISCOUNT_PERCENTAGE;
  }

  // Coupon discount (applied after payment method discount)
  let couponDiscount = 0;
  let couponDiscountPercentage = 0;
  if (couponValidation?.valid) {
    couponDiscount = (subtotal * (couponValidation.discount_percentage || 0)) / 100;
    couponDiscountPercentage = couponValidation.discount_percentage || 0;
  }

  const totalDiscount = paymentMethodDiscount + couponDiscount;
  const discountedSubtotal = subtotal - totalDiscount;
  const shipping = subtotal > 199 ? 0 : DELIVERY_FEE;
  const total = discountedSubtotal + shipping;

  useEffect(() => {
    setOrderTotal(total);
  }, [total, setOrderTotal]);

  return (
    <div
      className="bg-white rounded-md md:p-6 md:shadow-md w-full max-w-md lg:max-w-none mx-auto lg:mx-0 transition-all duration-300"
      aria-labelledby="cart-summary-title"
    >

      {isLoading && (
        <div className="flex flex-col justify-center items-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-sky-200 border-t-sky-600 mb-4"></div>
          <p className="text-gray-600 text-sm font-medium">Loading your order...</p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4 flex items-start gap-3"
          role="alert"
        >
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {!isLoading && !error && cart.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <div className="bg-sky-100 rounded-full p-4 mb-4">
            <svg className="w-12 h-12 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Your cart is empty.</p>
        </div>
      )}

      {!isLoading && !error && cart.length > 0 && (
        <>
          <div className="ml-2 mb-4">
            <p className=" text-gray-800 flex items-center">
              {cart.reduce((acc, item) => acc + item.quantity, 0)} {" "}
              item(s) in your order
            </p>
          </div>

          <ul className="divide-y divide-gray-200 mb-6 max-h-80 overflow-y-auto" role="list">
            {cart.map((item) => (
              <li
                key={item.id}
                className="py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors duration-200"
                role="listitem"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
                      {item.name}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-1">
                      {/* {item.strength && (
                        <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {item.strength}
                        </span>
                      )} */}
                      <span className="inline-flex items-center bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {item.pack_size}
                      </span>
                      <span className="text-xs text-gray-500">× {item.quantity}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-700 text-base md:text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${Number(item.price).toFixed(2)} each
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-3 text-sm text-gray-700 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            {paymentMethodDiscount > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Payment Method Discount ({paymentMethodDiscountPercentage}%)</span>
                <span className="font-semibold text-green-600">-${paymentMethodDiscount.toFixed(2)}</span>
              </div>
            )}

            {couponDiscount > 0 && (
              <div className="flex justify-between items-center rounded-lg">
                <span className="text-green-700 font-semibold">Coupon Discount ({couponDiscountPercentage}%)</span>
                <span className="font-bold text-green-600">-${couponDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">International Shipping</span>
              <span className="font-semibold text-gray-900">
                ${shipping.toFixed(2)}
              </span>
            </div>

            {subtotal < 199 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 mt-3">
                <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-amber-800 font-medium">
                  Add ${(199 - subtotal).toFixed(2)} more to get free shipping!
                </p>
              </div>
            )}

            <div className="border-t-2 border-gray-300 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-black">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
