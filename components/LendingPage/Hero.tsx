import Link from "next/link";
import {
  ArrowRight,
  Check,
  Droplets,
  HeartPulse,
  Pill,
  Ribbon,
  ShieldCheck,
  Sparkles,
  Tablets,
} from "lucide-react";

/**
 * The palette uses clinical greens and soft mint surfaces to communicate
 * safety, trust, and professionalism throughout the pharmacy experience.
 */

const CATEGORIES = [
  { name: "Men's health", href: "/mens-health", icon: Pill },
  {
    name: "Ivermectin",
    href: "/medicines/search?query=ivermectin&page=1",
    icon: Tablets,
  },
  { name: "Diabetes", href: "/categories/diabetes", icon: Droplets },
  {
    name: "Heart & Blood Pressure",
    href: "/categories/heart-blood-pressure",
    icon: HeartPulse,
  },
  { name: "Cancer", href: "/categories/anticancer", icon: Ribbon },
  { name: "Skin Care", href: "/categories/beauty-skin-care", icon: Sparkles },
];

/**
 * The Top 12 reasons now live inside the Hero rather than in a separate section
 * further down the page. Copy is verbatim from the previous component — only the
 * surface changed, from a dark navy panel to the Hero's own light language:
 * white card, deep green heading, mint ticks. Kept deliberately imageless because no
 * other part of the Hero carries photography.
 */
const REASONS = [
  "Lowest Price Guarantee",
  "Exceptional Customer Service",
  "Every order is reviewed before dispatch",
  "Sourced only from WHO-approved facilities",
  "Two independent quality tests per batch",
  "Plain, unmarked packaging on every parcel",
  "100% Secure Transactions - SSL Encrypted",
  "Quality medications, Parasite Heal prices",
  "Free shipping on orders over $199",
  "Tracking sent the moment it leaves us",
  "Straight answers on pricing",
  "Patient privacy above everything else",
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="w-full bg-green-50 px-4 pt-12 pb-16 sm:px-6 md:pt-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow — a real credential, not a decorative badge */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-green-700 ring-1 ring-green-400/20">
            <ShieldCheck className="h-4 w-4" strokeWidth={2} />
          </span>
          <p className="text-[13px] font-semibold text-green-900">
            Trusted online pharmacy &middot; Dispensing since 2019
          </p>
        </div>

        <h1
          id="hero-title"
          className="mt-6 max-w-3xl text-[2.3rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-green-900 sm:text-[3rem] md:text-[3.6rem]"
        >
         Better prices for the
          <br />
          <span className="text-green-700">medicines you rely on.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
          Every order is inspected by our in-house dispensing team, sealed with no
          medical markings on the box, and shipped worldwide with tracking. 
        </p>

        {/* Both CTAs share a single row on mobile: flex-1 splits the width evenly,
            and the secondary label shortens below sm so neither wraps. */}
        <div className="mt-8 flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/medicines"
            className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-green-600 px-4 py-3 text-[13.5px] font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-green-700 hover:shadow-xl active:scale-[0.98] sm:flex-none sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            Shop medicines
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/how-to-order-medicines"
            className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-3 text-[13.5px] font-bold text-green-900 ring-1 ring-slate-900/10 transition-colors hover:text-green-700 hover:ring-green-400/40 sm:flex-none sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            <span className="sm:hidden">How it works</span>
            <span className="hidden sm:inline">How ordering works</span>
          </Link>
        </div>

        {/* Categories — the whole card changes colour on hover */}
        <h2 className="mt-14 text-[15px] font-bold text-green-900">
          What can we help with?
        </h2>

        {/* 2-up on mobile. Cards stack vertically below sm so long labels such as
            "Heart & Blood Pressure" have the full card width to wrap into. */}
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {CATEGORIES.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="group flex min-h-[110px] flex-col justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-900/[0.07] transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg hover:shadow-green-900/20 hover:ring-green-600 active:bg-green-600 active:ring-green-600 sm:min-h-[92px] sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-5"
            >
              {/* Mobile: badges sit above the label. Desktop: they sit to the right. */}
              <span className="order-1 flex items-center justify-between sm:order-2 sm:ml-auto sm:shrink-0 sm:justify-end sm:gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700 transition-colors group-hover:bg-white/20 group-hover:text-white group-active:bg-white/20 group-active:text-white sm:h-10 sm:w-10">
                  <Icon
                    className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-900 text-white transition-colors group-hover:bg-white group-hover:text-green-700 group-active:bg-white group-active:text-green-700 sm:h-9 sm:w-9">
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </span>

              <span className="order-2 text-[14px] leading-snug font-bold tracking-[-0.01em] text-green-900 transition-colors group-hover:text-white group-active:text-white sm:order-1 sm:text-[16px]">
                {name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.07] sm:p-8">
          <h2
            id="reasons-title"
            className="text-[1.9rem] leading-[1.2] font-bold tracking-[-0.02em] text-green-900"
          >
            Top 12 Reasons To Shop At{" "}
            <span className="text-green-700">ParasiteHeal.com</span>
          </h2>



          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-2.5 text-[13.5px] leading-snug font-medium text-slate-700"
              >
                <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {reason}
              </li>
            ))}
          </ul>

            <p className="mt-6 max-w-[58ch] text-[14px] leading-6 text-slate-600">
            These twelve things are true of every parcel we send, whether it is
            one strip of tablets or a three-month supply.
          </p>

        </div>
      </div>
    </section>
  );
}
