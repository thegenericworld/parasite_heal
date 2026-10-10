'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, ShieldCheck, Truck, ArrowRight, ShoppingCart, Lock, Package } from 'lucide-react';
import Link from 'next/link';

const trustStats = {
  customers: 10400,
  orders: 200000,
  countries: 100,
  rating: 4.8,
  reviews: 10000,
};

const medications = [
  {
    brand: 'Eliquis® 5 mg',
    generic: 'Apixaban 5 mg',
    brandPrice: 230.40,
    genericPrice: 57.00,
    link: '/medicines/apixagress-5mg-tablet',
    unit: 'month',
  },
  {
    brand: 'Januvia® 100 mg',
    generic: 'Sitagliptin 100 mg',
    brandPrice: 56.00,
    genericPrice: 24.50,
    link: '/medicines/sitahenz-100mg-tablet',
    unit: 'month',
  },
  {
    brand: 'Viagra® 100 mg',
    generic: 'Sildenafil 100 mg',
    brandPrice: 20.00,
    genericPrice: 0.65,
    link: '/medicines/cenforce-100mg',
    unit: 'tablet',
  },
];

const Hero = () => {
  const [currentMed, setCurrentMed] = useState(0);
  const [displayedCustomers, setDisplayedCustomers] = useState(0);
  const med = medications[currentMed];
  const savings = (med.brandPrice - med.genericPrice).toFixed(2);

  // Animated counter effect
  useEffect(() => {
    const target = trustStats.customers;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayedCustomers(target);
        clearInterval(timer);
      } else {
        setDisplayedCustomers(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const nextMedication = () => {
    setCurrentMed((prev) => (prev + 1) % medications.length);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 100000 ? 0 : 1) + 'K+';
    }
    return num.toString();
  };

  return (
    <section className="relative w-full bg-linear-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden" aria-label="Hero section">

      {/* Background decoration (optional) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-3 md:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* --- LEFT COLUMN: All Text & Actions --- */}
          <div className="space-y-6 md:space-y-8 z-10 relative">

            {/* Trust Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-400/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-[11px] md:text-xs font-medium text-blue-100 tracking-wide">
                  Sourced from Verified Manufacturers
                </span>
              </div>
              {/* <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-3 py-1.5 ">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-medium text-amber-200">Order today, ships within 24 hours</span>
                </div> */}
              {/* <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[11px] md:text-xs font-bold text-amber-200">
                  {trustStats.rating}
                </span>
                <span className="text-[10px] text-amber-200/80">
                  ({formatNumber(trustStats.reviews)} reviews)
                </span>
              </div> */}
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Pay less for the <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-300 via-emerald-200 to-teal-200">
                  Same Medicine.
                </span>
              </h1>
              <p className="md:text-lg text-blue-100 max-w-xl leading-relaxed opacity-90">
                Join <span className="font-bold text-white">{formatNumber(displayedCustomers)}</span> customers who save up to 90% on their medications. Same active ingredients, delivered discreetly worldwide.
              </p>
            </div>

            {/* Guarantee Badge */}
            {/* <div className="flex items-center gap-3 bg-green-500/15 border border-green-400/30 rounded-xl px-4 py-3 w-fit backdrop-blur-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-full">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">100% Money-Back Guarantee</p>
                <p className="text-xs text-green-200/80">Not satisfied? Full refund, no questions asked.</p>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/medicines"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-900 bg-white rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Medicines
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border-2 border-blue-400/50 rounded-xl hover:bg-blue-700/50 hover:border-blue-400 transition-all duration-200"
              >
                About
              </Link>
            </div>

            {/* Mini Stats Row */}
            {/* <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center bg-blue-800/30 rounded-lg py-3 px-2 border border-blue-500/20">
                <p className="text-xl md:text-2xl font-bold text-white">{trustStats.countries}+</p>
                <p className="text-[10px] md:text-xs text-blue-200">Countries Served</p>
              </div>
              <div className="text-center bg-blue-800/30 rounded-lg py-3 px-2 border border-blue-500/20">
                <p className="text-xl md:text-2xl font-bold text-white">{formatNumber(trustStats.orders)}</p>
                <p className="text-[10px] md:text-xs text-blue-200">Orders Delivered</p>
              </div>
              <div className="text-center bg-blue-800/30 rounded-lg py-3 px-2 border border-blue-500/20">
                <p className="text-xl md:text-2xl font-bold text-white">24/7</p>
                <p className="text-[10px] md:text-xs text-blue-200">Support Available</p>
              </div>
            </div> */}

            {/* Trust Signals Footer */}
            <div className="pt-4 flex flex-wrap items-center gap-2 md:gap-5 text-[10px] md:text-sm font-medium text-blue-200">
              <div className="flex items-center gap-1 md:gap-2">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                <span>Discreet Packaging</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                <span>Worldwide Delivery</span>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: Visuals --- */}
          <div className="relative z-10 flex flex-col items-center lg:items-end">

            <div className="w-full max-w-2xl md:max-w-xl">
              <div className="text-center mb-8">

                <h3 className="text-white text-lg md:text-xl font-bold">Compare & Save</h3>
                <p className="text-blue-200 text-xs md:text-sm">Same quality, fraction of the price.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 items-stretch">

                {/* LEFT CARD: BRAND (The Anchor) */}
                <div className="bg-slate-50 rounded-xl p-2 md:p-5 border border-slate-200 relative opacity-90 hover:opacity-100 transition-opacity">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-500 border border-slate-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Brand
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm md:text-xl font-serif font-bold text-slate-500">{med.brand}</p>
                    <p className="text-[10px] text-slate-400 mt-1 mb-4">Original Brand</p>

                    <div className="bg-white rounded-lg p-3 mb-4 border border-dashed border-slate-300">
                      <p className="text-[10px] text-slate-400 mb-1">Retail Price</p>
                      <p className="text-lg md:text-2xl font-bold text-slate-400 line-through decoration-red-400/50 decoration-2">
                        ${med.brandPrice.toFixed(2)}
                      </p>
                      <span className='text-[10px] text-slate-400'>per {med.unit}</span>
                    </div>

                    <div className="space-y-2 text-[10px] text-slate-500 text-left px-2">
                      <div className="flex justify-between">
                        <span>Marketing Cost</span>
                        <span className="text-red-500 font-bold">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Brand Premium</span>
                        <span className="text-red-500 font-bold">Included</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT CARD: GENERIC (The Winner) */}
                <div className="bg-white rounded-xl p-2 md:p-5 border-4 border-green-500 shadow-2xl relative transform scale-105 z-20 flex flex-col h-full">

                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] md:text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 ">
                    Smart Choice
                  </div>

                  <div className="mt-4 text-center flex-1">
                    <p className="text-sm md:text-2xl font-bold text-slate-900">{med.generic}</p>
                    <p className="text-[9px] md:text-[10px] text-green-600 font-bold uppercase tracking-wide mt-1 mb-4">Generic Equivalent</p>

                    <div className="mb-5">
                      <div className="flex items-baseline justify-center gap-1">
                        <p className="text-xl md:text-4xl font-extrabold text-green-600 tracking-tight">
                          ${med.genericPrice.toFixed(2)}
                        </p>
                        <span className='text-sm text-slate-500 font-medium'>/ {med.unit}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[9px] md:text-[11px] text-slate-700 text-left px-2 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="font-medium">Same Active Ingredient</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="font-medium">Same Effectiveness</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    {/* Savings Info Box */}
                    <div className="bg-green-50 border border-green-100 rounded-lg py-2 px-1 text-center">
                      <p className="text-[10px] md:text-xs font-bold text-green-800">
                        Save <span className="underline decoration-green-400">${savings}</span> per {med.unit}
                      </p>
                    </div>

                    {/* ACTION BUTTON */}
                    <Link href={`${med.link}`} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.98]">
                      <span>Buy Now</span>
                      <ShoppingCart className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Micro Trust */}
                    <div className="flex items-center justify-center gap-1 text-[9px] text-slate-500">
                      <Lock className="w-3 h-3" />
                      <span>Secure checkout • 256-bit encryption</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Navigation Dots */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex gap-2">
                  {medications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMed(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentMed ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/50'}`}
                      aria-label={`View ${medications[index].generic} comparison`}
                    />
                  ))}
                </div>
                <button onClick={nextMedication} className="text-xs text-blue-100 hover:text-white font-semibold flex items-center gap-1 cursor-pointer">
                  Next Example <ArrowRight className="w-3 h-3" />
                </button>
              </div>



            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;