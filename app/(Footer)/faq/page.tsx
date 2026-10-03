import {
  ChevronDown,
  Truck,
  CreditCard,
  Package
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "FAQ | Parasite Heal - Online Pharmacy",
  description:
    "Find answers to frequently asked questions about Parasite Heal. Learn about ordering, payments, shipping, delivery, prescription requirements, and more.",
  alternates: {
    canonical: "/faq",
  },
  robots: { index: true, follow: true },
};

// FAQ Data Structure
const faqs = [
  {
    category: "Ordering",
    icon: <Package className="w-6 h-6 text-slate-700" />,
    items: [
      {
        question: "How do I place an order?",
        answer: <Link href='/how-to-order-medicines' className="text-blue-600 font-semibold underline">Click here to know</Link>
      },
      {
        question: "Can I cancel my order after placing it?",
        answer: "Yes, you can cancel your order within 24 hours of placing it. Please contact our support team immediately."
      },
      {
        question: "Can You Guarantee Confidentiality About My Purchases?",
        answer: "Parasite Heal offers you full confidentiality and an anonymous experience for buying medicines as it does not share your personal or payment transaction details with anyone."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: <Truck className="w-6 h-6 text-slate-700" />,
    items: [
      {
        question: "How long does delivery take?",
        answer: "International orders usually take 7-15 business days depending on customs clearance in your country. You will receive a tracking number as soon as your order ships."
      },
      {
        question: "Is the packaging discreet?",
        answer: "Absolutely. We understand your need for privacy. All orders are shipped in plain, unmarked brown boxes with no medical labels or logos on the outside. The return address does not mention 'Pharmacy'."
      }
    ]
  },
  {
    category: "Payment & Security",
    icon: <CreditCard className="w-6 h-6 text-slate-700" />,
    items: [
      {
        question: "Is it safe to use my credit card?",
        answer: "Yes. It is absolutely safe to use your credit card, because payment processing will be handled securely by our payment gateway partners. We do not store your credit card details on our servers."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major Credit/Debit cards (Visa, Mastercard, Amex). We do not accept Cash on Delivery for international shipments."
      },
      {
        question: "How do I return a product?",
        answer: "If you receive a damaged or incorrect item, please contact us within 7 days of delivery. Due to health regulations, we cannot accept returns of opened prescription medications, but we will issue a full refund or reshipment for any error on our part."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600">
            Find answers to common questions about ordering, delivery, payments, and more. If you need further assistance, our support team is ready to help.
          </p>
        </div>

        {/* Content List */}
        <div className="space-y-16 md:space-y-24">
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              {/* Category Side */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="md:sticky md:top-24">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-slate-100">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {section.category}
                  </h2>
                </div>
              </div>

              {/* Questions Side */}
              <div className="md:col-span-8 lg:col-span-9">
                <div className="border-t border-slate-200">
                  {section.items.map((item, itemIdx) => (
                    <details key={itemIdx} className="group border-b border-slate-200">
                      <summary className="flex items-center justify-between py-6 cursor-pointer list-none outline-none">
                        <span className="text-lg font-medium text-slate-900 group-hover:text-slate-600 transition-colors pr-8">
                          {item.question}
                        </span>
                        <span className="shrink-0 ml-4">
                          <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-transform duration-300 group-open:-rotate-180" />
                        </span>
                      </summary>
                      <div className="pb-6 text-slate-600 text-base leading-relaxed pr-8 md:pr-12">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}