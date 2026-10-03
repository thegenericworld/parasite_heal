import type { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaChevronRight } from "react-icons/fa";

// 👇 Add this: Generate <meta name="robots"> for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: "noindex, nofollow",
  };
}


export default function PayWithCryptoPage() {

    return (
        <main className="min-h-screen bg-white pb-20">
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center text-xs text-slate-500">
                    <Link
                        href="/"
                        className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-medium"
                    >
                        <FaHome className="text-slate-400" size={12} /> Home
                    </Link>
                    <FaChevronRight className="mx-2 text-slate-300" size={10} />
                    <span className="text-slate-700 font-medium">Crypto Guide</span>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
                <header className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        How to Buy Crypto
                    </h1>
                    <p className="max-w-3xl text-sm text-slate-600 mt-3">
                        Use this page as your single reference for buying crypto.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <a
                            href="#buy-crypto"
                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                        >
                            Buy Crypto
                        </a>
                        <a
                            href="#paypal"
                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                        >
                            Buy with PayPal
                        </a>
                        <a
                            href="#discount"
                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                        >
                            Discount Info
                        </a>
                    </div>
                </header>

                <div className="grid gap-10">

                    <section
                        id="buy-crypto"
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10"
                    >
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Buy Crypto</h2>
                        <p className="text-slate-700 mb-4">
                            Cryptocurrency purchases are supported via PayPal, credit card, and bank transfer.
                        </p>
                        <p className="text-slate-700 mb-4">
                            Buy your crypto here:&nbsp;
                            <a
                                href="https://www.bitpay.com/buy-crypto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 hover:text-sky-700 underline"
                            >
                                Buy Crypto on Bitpay
                            </a>
                        </p>

                        <ol className="list-decimal list-inside space-y-3 text-slate-700 mb-6">
                            <li>Purchase cryptocurrency on BitPay.</li>
                            <li>Select your desired currency (USD, AUD, GBP, etc.).</li>
                            <li>Choose your cryptocurrency (Bitcoin, ETH, USDT, etc.).</li>
                            <li>Select a payment method (PayPal, credit card, bank transfer).</li>
                            <li>Complete your purchase.</li>
                        </ol>

                        <p className="text-slate-700">
                            If you don’t have a personal crypto wallet, you can send your payment directly to our address. We’ll verify the transaction and confirm your payment.
                        </p>
                        <p className="text-slate-700 mt-6">
                            Prefer another option? You can also purchase crypto with a credit/debit card or paypal via MoonPay and send it directly to our wallet address.
                            <br />
                            <a
                                href="https://www.moonpay.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 hover:text-sky-700 underline"
                            >
                                Buy crypto on MoonPay
                            </a>
                        </p>

                    </section>

                    <section
                        id="paypal"
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10"
                    >
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">PayPal → Bitcoin (Send to Our Wallet)</h2>
                        <p className="text-slate-700 mb-6">
                            Follow these steps to buy Bitcoin in PayPal and withdraw it to the wallet address we provide.
                        </p>

                        <ol className="list-decimal list-inside space-y-4 text-slate-700 mb-8">
                            <li>
                                Go to <strong>https://www.paypal.com</strong> and log into your PayPal account.
                            </li>
                            <li>
                                Click <strong>Finances</strong>, then open the <strong>Crypto</strong> tab.
                            </li>
                            <li>
                                Buy the amount of <strong>Bitcoin</strong> that matches your <strong>order total in USD</strong>.
                            </li>
                            <li>
                                Withdraw the Bitcoin from PayPal to <strong>our wallet address</strong> (you’ll find it at the top of this page).
                            </li>
                            <li>
                                Once the payment is sent, <strong>email us to confirm</strong>, and we’ll start processing your order.
                            </li>
                        </ol>

                        <div className="grid gap-3 md:grid-cols-2">
                            <a
                                href="https://www.youtube.com/watch?v=MTKEAcSsrPs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 hover:border-slate-300 hover:bg-white transition"
                            >
                                <p className="font-semibold text-slate-900">Video Guide: Send Bitcoin from PayPal (Guide 1)</p>
                                <p className="text-sm text-slate-600 mt-1">Step-by-step walkthrough for withdrawing BTC to an external wallet.</p>
                            </a>
                            <a
                                href="https://www.youtube.com/watch?v=gBUSw5XYaVU"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 hover:border-slate-300 hover:bg-white transition"
                            >
                                <p className="font-semibold text-slate-900">Video Guide: Send Bitcoin from PayPal (Guide 2)</p>
                                <p className="text-sm text-slate-600 mt-1">Alternative walkthrough to help you complete the transfer.</p>
                            </a>
                        </div>
                    </section>

                    <section
                        id="discount"
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10"
                    >
                        <h2 className="text-xl font-semibold text-amber-900 mb-3">Pay with Crypto &amp; Save</h2>
                        <p className="text-amber-800 mb-4">
                            When you pay using crypto, you qualify for an additional <span className="font-semibold">20% discount</span>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
