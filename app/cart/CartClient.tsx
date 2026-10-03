// app/cart/CartClient.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

// Constants
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
// const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const DELIVERY_FEE = 30; // Flat delivery fee for orders under $199

const LOCAL_STORAGE_CART_KEY = "guest_cart_items";
const API_ENDPOINTS = {
  CART: `${BASE_API_URL}/cart`,
  GUEST_CART: `${BASE_API_URL}/cart/guest`,
  UPDATE_QUANTITY: (id: number) => `${BASE_API_URL}/cart/update-quantity/${id}`,
  REMOVE_ITEM: (id: number) => `${BASE_API_URL}/cart/remove/${id}`,
};

// Types
interface CartItem {
  id: number;
  name: string;
  image: string;
  slug: string;
  price: number;
  pack_size: string;
  quantity: number;
  product_id: number;
  product_variant_id: number;
}

interface LocalCartItem {
  product_variant_id: number;
  quantity: number;
}

const CartItemComponent: React.FC<{
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}> = ({ item, updateQuantity, removeItem }) => {
  const handleRemove = async () => {
    if (
      confirm(`Are you sure you want to remove ${item.name} from your cart?`)
    ) {
      await removeItem(item.id);
    }
  };

  return (
    <div className="bg-white flex flex-col w gap-4 transition-all duration-300 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4 sm:gap-6 items-start sm:items-center w-full sm:w-auto">
          <div className="relative shrink-0 rounded-xl md:p-3">
            <Image
              src={item.image}
              className="rounded-lg h-16 w-16 md:h-32 md:w-32"
              width={100}
              height={100}
              alt={item.name}
            />
          </div>
          <div className="flex-1">
            <Link href={`/medicines/${item.slug}`} className="block group">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-200 line-clamp-2">
                {item.name}
              </h2>
            </Link>
            <div className="mt-2 inline-flex items-center bg-sky-50 text-sky-700 px-3 py-1.5 sm:py-1 rounded-full text-sm sm:text-xs font-semibold">
              <svg className="w-3.5 h-3.5 sm:w-3 sm:h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {item.pack_size}
            </div>
            {/* Desktop  */}
            <div className="hidden md:block mt-4 items-center gap-3">
              <div className="flex">   <div className="flex items-center border-2 border-sky-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  className="bg-sky-50 text-sky-700 px-3 sm:px-4 py-2 text-lg font-bold hover:bg-sky-100 active:bg-sky-200 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="px-4 sm:px-5 py-2 text-base font-bold text-gray-900 min-w-10 text-center">
                  {item.quantity}
                </span>
                <button
                  className="bg-sky-50 text-sky-700 px-3 sm:px-4 py-2 text-lg font-bold hover:bg-sky-100 active:bg-sky-200 transition-colors duration-200 cursor-pointer"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
                <button
                  className="flex items-center justify-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm md:text-base font-semibold cursor-pointer min-h-[44px] min-w-[44px]"
                  onClick={handleRemove}
                  aria-label={`Remove ${item.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Remove</span>
                </button></div>

            </div>
          </div>
        </div>
        <div className="text-right mt-2 sm:mt-0 flex justify-between md:flex-col md:items-end">
          <div className="md:hidden  ">
            {/* Mobile  */}
            <div className="w-full flex justify-evenly items-center gap-3">
              <div className="flex items-center border-2 border-sky-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  className="bg-sky-50 text-sky-700 px-3 sm:px-4 py-2 text-lg font-bold hover:bg-sky-100 active:bg-sky-200 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="px-4 sm:px-5 py-2 text-base font-bold text-gray-900 min-w-10 text-center">
                  {item.quantity}
                </span>
                <button
                  className="bg-sky-50 text-sky-700 px-3 sm:px-4 py-2 text-lg font-bold hover:bg-sky-100 active:bg-sky-200 transition-colors duration-200 cursor-pointer"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
              <button
                className="flex items-center justify-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-semibold cursor-pointer min-h-[44px]"
                onClick={handleRemove}
                aria-label={`Remove ${item.name}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="sr-only">Remove</span>
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">${Number(item.price).toFixed(2)} × {item.quantity}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <hr className="text-gray-300 pb-2" />
    </div>
  );
};

export default function CartClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Memoized calculations
  const { subtotal, shipping, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const ship = sub > 199 ? 0 : DELIVERY_FEE;
    return {
      subtotal: sub,
      shipping: ship,
      total: sub + ship,
    };
  }, [cartItems]);

  // Save cart to localStorage for guest users
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      cartItems.length > 0
    ) {
      const localCartItems: LocalCartItem[] = cartItems.map((item) => ({
        product_variant_id: Number(item.product_variant_id),
        quantity: item.quantity,
      }));
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(localCartItems)
      );
    }
  }, [cartItems]);

  // Load cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (typeof window !== "undefined") {
          // Fetch cart for guest user from local storage
          const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
          if (!storedCart) {
            setCartItems([]);
            return;
          }

          const parsedCart = JSON.parse(storedCart);
          const variantIds = parsedCart.map((item: { product_variant_id: string }) => item.product_variant_id);

          const { data } = await axios.post(
            API_ENDPOINTS.GUEST_CART,
            { variantIds }
          );

          const enrichedCart = data.map((item: { product_variant_id: number, product_id: string }) => {
            const localItem = parsedCart.find(
              (i: { product_variant_id: number }) => i.product_variant_id === item.product_variant_id
            );
            return {
              ...item,
              id: item.product_variant_id,
              quantity: localItem?.quantity || 1,
              product_id: Number(item.product_id),
              product_variant_id: item.product_variant_id,
            };
          });
          setCartItems(enrichedCart);
        }
      } catch (err) {
        console.error("Failed to load cart items:", err);
        setError("Failed to load cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  /**
   * Updates the quantity of a cart item
   * @param itemId - The ID of the cart item
   * @param newQuantity - The new quantity to set
   */
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setError("");

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    const updatedCart = cartItems.map((item) => {
      return {
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
      };
    });
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedCart));

  };

  /**
   * Removes an item from the cart
   * @param id - The ID of the item to remove
   */
  const removeItem = async (id: number) => {
    setError("");


    setCartItems((prev) => prev.filter((item) => item.id !== id));
    const updatedCart = cartItems.map((item) => {
      return {
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
      };
    });
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedCart));

  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl m-auto mb-3 p-4 sm:p-6 lg:p-8">

        <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-md">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 6.8999C17 6.30895 16.8707 5.72379 16.6194 5.17783C16.3681 4.63186 15.9998 4.13579 15.5355 3.71792C15.0712 3.30006 14.52 2.96859 13.9134 2.74244C13.3068 2.5163 12.6566 2.3999 12 2.3999C11.3434 2.3999 10.6932 2.5163 10.0866 2.74244C9.47995 2.96859 8.92876 3.30006 8.46447 3.71792C8.00017 4.13579 7.63188 4.63186 7.3806 5.17783C7.12933 5.72379 7 6.30895 7 6.8999"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M17.252 7.57471H6.75458C4.30042 7.57471 2.42498 9.76434 2.80209 12.1894L3.7622 18.3634C4.0652 20.3118 5.74287 21.7488 7.7147 21.7488H16.2919C18.2637 21.7488 19.9414 20.3118 20.2444 18.3634L21.2045 12.1894C21.5816 9.76433 19.7062 7.57471 17.252 7.57471Z"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <path
                  d="M15 12C15 12.394 14.9224 12.7841 14.7716 13.1481C14.6209 13.512 14.3999 13.8427 14.1213 14.1213C13.8427 14.3999 13.512 14.6209 13.1481 14.7716C12.7841 14.9224 12.394 15 12 15C11.606 15 11.2159 14.9224 10.8519 14.7716C10.488 14.6209 10.1573 14.3999 9.87868 14.1213C9.6001 13.8427 9.37913 13.512 9.22836 13.1481C9.0776 12.7841 9 12.394 9 12"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Cart
            </h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg mb-8 shadow-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Loading your cart...</p>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200">
            <div className="bg-sky-100 rounded-full p-6 mb-6">
              <svg className="w-16 h-16 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 text-base mb-6 text-center max-w-md">
              Looks like you haven&apos;t added any medicines yet. Start shopping to find quality medications at affordable prices!
            </p>
            <Link
              href="/medicines"
              className="bg-linear-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Browse Medicines →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-4 bg-white p-2 md:p-6 md:rounded-md md:shadow-md md:border md:border-gray-200">
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-sky-600 text-lg">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span> item(s) in your cart
                </p>
                <hr className="text-gray-300 pb-2" />
                {cartItems.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="bg-white rounded-md shadow-md p-6 sm:p-8 h-fit  top-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h2>
              <div className="space-y-4 text-slate-700 text-base mb-8">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                  </span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">International Shipping</span>
                  <span className="font-semibold text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                {/* {discount > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )} */}
                {subtotal < 199 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm md:text-base text-amber-800 font-bold">
                      Add ${(199 - subtotal).toFixed(2)} to get free shipping!
                    </p>
                  </div>
                )}
                <hr className="border-t-2 border-gray-200 my-4" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>



              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`mt-4 w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 text-center flex items-center justify-center gap-2
                  ${cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                aria-disabled={cartItems.length === 0}
              >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}