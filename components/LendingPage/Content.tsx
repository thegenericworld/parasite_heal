"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Truck,
  Lock,
  CheckCircle2,
  ChevronDown,
  BadgeDollarSign,
  HeartHandshake
} from "lucide-react";


const Content: React.FC = () => {
  // Open the first section by default for better engagement
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "section1": true
  });

  const toggleSection = (sectionId: string): void => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections = [
    {
      id: "section1",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Is it safe to buy generic medicines online?",
      content: (
        <div className="space-y-4">
          <p>
            <strong>Absolutely.</strong> At Parasite Heal, patient safety is our #1 priority.
            We do not compromise on quality. All our medications are:
          </p>
          <ul className="grid md:grid-cols-2 gap-3 mt-2">
            {[
              "Sourced from carefully vetted manufacturers",
              "Equivalent formulations with verified ingredients",
              "Each order reviewed before dispatch",
              "Secure, tamper-evident packaging"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "section2",
      icon: <BadgeDollarSign className="w-6 h-6 text-green-600" />,
      title: "Why are medicines cheaper on ParasiteHeal than local pharmacies?",
      content: (
        <div className="space-y-4">
          <p>
            Medicines on ParasiteHeal are significantly cheaper because the pharmacy sells high-quality Indian generic medicines, which contain the same active ingredients as branded drugs but are manufactured at a fraction of the cost. India is the world&apos;s largest producer of generic pharmaceuticals, benefiting from lower manufacturing costs, government pricing regulations, and large-scale production. ParasiteHeal passes these savings directly to customers, allowing savings of up to 85% compared to branded equivalents sold in Western retail pharmacies.
          </p>
          <p>
            <strong>Example:</strong> A branded ED pill like Viagra can cost $70-$80 per pill in the US, while its generic equivalent, Sildenafil, is available for as low as $1-$2 per pill on ParasiteHeal.
          </p>
        </div>
      ),
    },
    {
      id: "section3",
      icon: <Lock className="w-6 h-6 text-purple-600" />,
      title: "100% Privacy & Discreet Shipping",
      content: (
        <div className="space-y-4">
          <p>
            We understand that your health is personal. That is why our privacy standards go beyond just data security.
          </p>
          <p>
            <strong>Plain Packaging:</strong> No medical labels or logos on the outside of the box.
          </p>
        </div>
      ),
    },
    {
      id: "section4",
      icon: <Truck className="w-6 h-6 text-orange-600" />,
      title: "Shipping, Returns & Guarantees",
      content: (
        <div className="space-y-4">
          <p>
            We ship to countries like the USA, UK, Australia, Japan and Korea.
          </p>
          <p className=""><strong>Reshipment Guarantee:</strong> If customs holds your package, we reship it for free.</p>
        </div>
      ),
    },
    {
      id: "section5",
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      title: "Why Customers Choose Us",
      content: (
        <div className="space-y-2">
          <p className="mb-4 text-gray-600">It&apos;s not just about prices. It&apos;s about reliability and care.</p>
          <ul className="grid gap-2">
            {[
              "Best Customer Support (Email & Callback)",
              "Easy Returns & Refund Policy",
              "Widest range of Generic ED, Diabetes, and Cancer medications",
              "Trusted by patients worldwide."
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-4 tracking-tight">Why Choose Parasite Heal?</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
          Everything you need to know about our quality, shipping, and safety standards.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openSections[section.id]
              ? "border-sky-300 shadow-lg bg-sky-50/50"
              : "border-slate-200 bg-white shadow-sm hover:border-sky-200 hover:shadow-md"
              }`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset rounded-2xl"
              aria-expanded={openSections[section.id]}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl transition-colors ${openSections[section.id] ? "bg-white shadow-sm" : "bg-slate-100"}`}>
                  {section.icon}
                </div>
                <span className={`text-base md:text-lg font-bold transition-colors ${openSections[section.id] ? "text-sky-900" : "text-slate-700"
                  }`}>
                  {section.title}
                </span>
              </div>

              <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openSections[section.id] ? "bg-sky-500" : "bg-slate-200"}`}>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${openSections[section.id] ? "rotate-180 text-white" : "text-slate-500"
                    }`}
                />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${openSections[section.id]
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="px-6 pb-7 pt-1 pl-18 text-slate-600 leading-relaxed border-t border-sky-200/60">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Content;