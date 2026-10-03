import CheckoutForm from './CheckoutForm';
import CartSummary from './CartSummary';
import { Metadata } from "next";
import { CheckoutProvider } from '@/contexts/CheckoutContext';

// 👇 Add this: Generate <meta name="robots"> for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: "noindex, nofollow",
  };
}


export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 lg:py-10">

          {/* Header Section */}
         <h1 className="text-xl md:text-2xl font-semibold text-gray-800 bg-white text-center py-4 mb-4">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
            {/* Left: Form */}
            <div className="w-full bg-white ">
              {/* Mobile Cart Summary */}
              <div className="block lg:hidden mx-2 border border-gray-200 px-4 pt-4 rounded-xl shadow-md mb-6">
                <div className="">
                  <details className="group">
                    <summary className="flex items-center justify-between font-bold text-gray-900 text-lg mb-4 cursor-pointer list-none">
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 text-sky-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        Your Order
                      </span>

                      {/* Arrow icon rotates automatically via CSS */}
                      <svg
                        className="w-5 h-5 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>

                    <div className="animate-fadeIn">
                      <CartSummary />
                    </div>
                  </details>
                </div>
              </div>
              <CheckoutForm />


            </div>

            {/* Right: Cart Summary (sticky on desktop) */}
            <div className="hidden lg:block sticky top-24 self-start">
              <CartSummary />
            </div>

          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}