import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Order | Parasite Heal",
  description:
    "Step-by-step guide on how to order medicines. Learn about searching products, secure checkout, and tracking your orders.",
  alternates: {
    canonical: "/how-to-order-medicines",
  },
  robots: { index: true, follow: true },
};

export default function HowToOrderPage() {
  return (
    <div className="min-h-screen  text-lg">

      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          How to Order Medicines
        </h1>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-0">

        <hr className="mb-4 text-gray-400"/>

        <section className="mb-6">
          <h2 className="font-bold text-2xl">Order via Email:</h2>
          <p>
            Email us at: <a href="mailto:ParasiteHeal@gmail.com" className="text-blue-600">ParasiteHeal@gmail.com</a> to place your order. Send us: required medicines and quantity. Our team will reply to your email within 8 hours.
          </p>
        </section>

        <hr className="my-4 text-gray-400"/>

        <section>
          <h2 className="font-bold mb-2 text-2xl">Order Online:</h2>
          <ul className="p-8 rounded-xl font-medium text-slate-700 list-decimal">
            <li className="mb-10">
              <h2 className="font-bold text-xl mb-4">Search for Your Medicine</h2>
              <ul className="list-disc">
                <li className="mb-2">
                  Type the brand name (e.g., <strong>Viagra</strong>) or generic name (e.g., <strong>Sildenafil</strong>) in the search bar.
                </li>
                <li className="mb-2">Many different brands of medicines and different dosages are available. Click whichever you need.</li>
              </ul>
            </li>
            <li className="mb-8">
              <h2 className="font-bold text-xl mb-4">Select pack size & Add to Cart</h2>
              <ul className="list-disc">
                <li className="mb-2">
                  Select your pack size (Check Active Ingredient and Dosage). Then, click <span className="font-bold text-green-600">&quot;Add to Cart&quot;</span> button.
                </li>
                <li className="mb-2">
                  Buying in bulk (90+ pills) unlocks bulk discounts and free shipping.
                </li>
                <li className="mb-2">
                  If you have more items to add, simply repeat process. When you&apos;re ready, click the <Link href="/cart" className="text-blue-600 font-semibold hover:underline">Cart</Link> icon at the top right.
                </li>
                <li>
                  After reviewing your order, click <span className="font-bold text-green-600">&quot;Proceed to Checkout&quot;</span>.
                </li>
              </ul>
            </li>
            <li className="mb-8">
              <h2 className="font-bold text-xl mb-4">Enter Checkout Information</h2>
              <ul className="list-disc">
                <li className="mb-2">
                  Enter your shipping address and other details carefully.
                </li>
                <li className="mb-2">
                  At last select the payment method from: Cards / Bank Transfer / Crypto Currency <span className="text-green-600">(20% Off)</span>
                </li>
                <li className="mb-2">
                  Click on <span className="font-bold text-green-600">&quot;Place Order Securely&quot;</span>.
                </li>
                <li className="mb-2">
                  <strong>Shipping Privacy:</strong> All orders are shipped in plain, unmarked boxes. No one will know what is inside.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-bold text-xl mb-4">Payment & Confirmation</h2>
              You will instantly receive an email from our team with payment instructions. Please check your inbox (and spam folder) for updates. Upon successful payment, you will receive a confirmation email.
            </li>
          </ul>
        </section>
        <hr className="my-6 text-gray-400"/>
        {/* --- CTA SECTION --- */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to order?</h2>
          <p className="text-slate-600 mb-6">Start searching for your medication now and see how much you can save.</p>
          <Link
            href="/medicines"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

      </main>
    </div>
  );
}