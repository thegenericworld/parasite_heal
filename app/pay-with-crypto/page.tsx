import type { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaChevronRight } from "react-icons/fa";
import WalletAddresses from "./WalletAddresses";

// 👇 Add this: Generate <meta name="robots"> for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: "noindex, nofollow",
  };
}

export default function PayWithCryptoPage() {
    const emailAddress = "ParasiteHeal@gmail.com";

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
                    <span className="text-slate-700 font-medium">Pay with Crypto</span>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
            
                <div className="grid gap-10">

                    <section
                        id="wallets"
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10"
                    >
                        <WalletAddresses email={emailAddress} />
                    </section>
                </div>
            </div>
        </main>
    );
}
