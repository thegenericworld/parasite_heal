// app/mens-health/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import Products from '@/components/LendingPage/4ProductsCard'; // Ensure this path is correct

const SITE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

export const metadata: Metadata = {
  title: "Men's Sexual Health | Buy Sildenafil & Tadalafil Online | ParasiteHeal",
  description: "Treat Erectile Dysfunction effectively with Chemist-approved generic medications. Shop Sildenafil (Generic Viagra), Tadalafil (Generic Cialis), and Oral Jellies. Discreet shipping worldwide.",
  keywords: "buy sildenafil online, generic viagra, tadalafil 20mg, kamagra jelly, men's health pharmacy, ed treatment online",
  openGraph: {
    title: "Men's Sexual Health & ED Treatments | ParasiteHeal",
    description: "Reclaim your confidence with affordable, authentic ED treatments. Sildenafil, Tadalafil, and more.",
    type: "website",
  },
  alternates:{
    canonical: "/mens-health",
  }
};

// --- Product Data ---
const viagra_slugs = [
  "cenforce-100mg",
  "cenforce-200mg",
  "vigora-50-mg-sildenafil-tablets",
  "suhagra-25mg"
];

const cialis_slugs = [
  "tadarise-20-mg",
  "vidalista-black-80-mg-tadalafil",
  "super-vidalista-tadalafil-depoxetine",
  "cialis-10-mg-tablet-cialis"
];

const oral_jelly_slugs = [
  "kamagra-100mg",
  "bigfun-jelly-100-mg-sildenafil-oral-jelly",
  "filagra-oral-jelly-100-mg-sildenafil-oral-jelly",
  "malegra-oral-jelly-sildenafil-oral-jelly"
];

const MensHealthPage = () => {

  // Structured Data for SEO (MedicalWebPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Men's Sexual Health Treatments",
    "description": "Chemist-approved generic medications for Erectile Dysfunction.",
    "url": `${SITE_URL}/mens-health`,
    "medicalSpecialty": "Urology"
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

           {/* Hero Section - Conversion Focused */}
      <section className="relative bg-linear-to-br from-blue-900 via-blue-800 to-sky-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-6">

              <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                Reclaim Your <span className="text-sky-300">Confidence</span> & <span className="text-sky-300">Vitality</span>
              </h1>

              <p className="md:text-lg text-blue-100 leading-relaxed">
                Discreet, affordable, and Chemist-approved medications for erectile dysfunction, premature ejaculation, and men&apos;s wellness. Take control of your intimate health today.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="#products"
                  className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center"
                >
                  Browse Medications →
                </Link>
                <Link
                  href="#how-it-works"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50 text-center"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right Content - Stats or Image */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sky-300">95%</div>
                    <div className="text-sm text-blue-100 mt-2">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sky-300">24/7</div>
                    <div className="text-sm text-blue-100 mt-2">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sky-300">1000+</div>
                    <div className="text-sm text-blue-100 mt-2">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sky-300">100%</div>
                    <div className="text-sm text-blue-100 mt-2">Discreet</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>

         {/* --- STICKY SUB-NAV --- */}
      <div className="sticky top-0 z-40 bg-white/90 border-b border-slate-300 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 overflow-x-auto no-scrollbar py-4 text-sm font-medium">
            <Link href="#sildenafil" className="whitespace-nowrap text-slate-600 hover:text-blue-600">Generic Viagra (Sildenafil)</Link>
            <Link href="#tadalafil" className="whitespace-nowrap text-slate-600 hover:text-blue-600">Generic Cialis (Tadalafil)</Link>
            <Link href="#jellies" className="whitespace-nowrap text-slate-600 hover:text-blue-600">Oral Jellies</Link>
            <Link href="#faq" className="whitespace-nowrap text-slate-600 hover:text-blue-600">FAQ</Link>
          </div>
        </div>
      </div>
      </section>

     

      {/* --- COMPARISON GUIDE (Educational Content) --- */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Which Treatment is Right for You?</h2>
            <p className="text-slate-600 mt-4">Understanding the difference between the two most popular active ingredients.</p>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4 text-blue-700 bg-blue-50/50">Sildenafil (Viagra)</th>
                  <th className="px-6 py-4 text-amber-700 bg-amber-50/50">Tadalafil (Cialis)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Duration</td>
                  <td className="px-6 py-4">4 - 6 Hours</td>
                  <td className="px-6 py-4">Up to 36 Hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Onset Time</td>
                  <td className="px-6 py-4">30 - 60 Minutes</td>
                  <td className="px-6 py-4">30 - 45 Minutes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Best For</td>
                  <td className="px-6 py-4">Planned intimacy</td>
                  <td className="px-6 py-4">Spontaneous intimacy</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Food Interaction</td>
                  <td className="px-6 py-4">Avoid heavy/fatty meals</td>
                  <td className="px-6 py-4">Can be taken with food</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <div id="treatments" className="w-full md:max-w-7xl mx-auto  md:px-8 py-12 space-y-24">
        
        {/* Sildenafil Section */}
        <section id="sildenafil" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-slate-200 pb-4 px-4">
            <div>
                <span className="text-blue-600 font-bold tracking-wide text-sm uppercase">The Classic Choice</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">Sildenafil Citrate</h2>
                <p className="text-slate-500 mt-2 max-w-2xl">The active ingredient in Viagra. Perfect for planned occasions with a proven track record of over 20 years.</p>
            </div>
            {/* <Link href="/categories/sildenafil" className="text-blue-600 font-semibold hover:underline mt-4 md:mt-0">View All Sildenafil →</Link> */}
          </div>
          <Products data={viagra_slugs} categories="Best Sellers" to="/medicines/search?query=sildenafil" />
        </section>

        {/* Tadalafil Section */}
        <section id="tadalafil" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-slate-200 pb-4 px-4">
            <div>
                <span className="text-amber-600 font-bold tracking-wide text-sm uppercase">The Weekend Pill</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">Tadalafil</h2>
                <p className="text-slate-500 mt-2 max-w-2xl">The active ingredient in Cialis. Offers a longer duration of action, allowing for greater spontaneity.</p>
            </div>
            {/* <Link href="/categories/tadalafil" className="text-amber-600 font-semibold hover:underline mt-4 md:mt-0">View All Tadalafil →</Link> */}
          </div>
          <Products data={cialis_slugs} categories="Best Sellers" to="/medicines/search?query=tadalafil" />
        </section>

         {/* Oral Jelly Section */}
         <section id="jellies" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-slate-200 pb-4 px-4">
            <div>
                <span className="text-pink-600 font-bold tracking-wide text-sm uppercase">Fast Acting & Easy to Swallow</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">Oral Jellies</h2>
                <p className="text-slate-500 mt-2 max-w-2xl">Liquid gel sachets that are absorbed faster into the bloodstream. Available in various fruit flavors.</p>
            </div>
            {/* <Link href="/categories/oral-jelly" className="text-pink-600 font-semibold hover:underline mt-4 md:mt-0">View All Jellies →</Link> */}
          </div>
          <Products data={oral_jelly_slugs} categories="Flavorful Options" to="/medicines/search?query=jelly" />
        </section>

      </div>

      {/* Benefits Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Generic Medications?
              </h2>
              <div className="space-y-4">
                {[
                  "Same active ingredients as brand-name drugs",
                  "Chemist-approved for safety and effectiveness",
                  "Save 70-90% compared to branded versions",
                  "Identical quality, strength, and performance",
                  "Backed by clinical studies and research"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-sky-500 to-blue-600 rounded-2xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">$1.20</div>
                <div className="text-xl mb-6">Per Pill Starting Price</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
                  <div className="text-sm text-blue-100 mb-2">Compare to Brand Name:</div>
                  <div className="text-3xl font-bold line-through opacity-75">$70</div>
                  <div className="text-green-300 font-semibold mt-2">You Save: $68.80 per pill!</div>
                </div>
                <Link href="#products" className="block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300">
                  Start Saving Today →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Men
          </h2>
          <p className="text-xl text-gray-600">Join thousands who&apos;ve regained their confidence</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Michael R.",
              age: 45,
              rating: 5,
              text: "After trying the branded version for years at ridiculous prices, I switched to generics from ParasiteHeal. Same results, 90% cheaper. Wish I'd found this years ago!",
              verified: true
            },
            {
              name: "David K.",
              age: 52,
              rating: 5,
              text: "The discreet packaging and fast delivery were impressive. Product works exactly as expected. Great customer service too - they answered all my questions promptly.",
              verified: true
            },
            {
              name: "James T.",
              age: 38,
              rating: 5,
              text: "Quality products at unbeatable prices. The ordering process was simple and private. Delivery was fast and packaging was completely discreet. Highly recommend!",
              verified: true
            }
          ].map((review, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-sky-600 flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">Age {review.age}</div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
              {review.verified && (
                <div className="flex items-center text-green-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Purchase
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION  --- */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
            {[
              { q: "Do generic ED meds work the same as the brand names?", a: "Yes. Generic medications are required by the FDA to have the same active ingredient, strength, dosage form, and route of administration as the brand-name product. For example, Cenforce 100mg contains the exact same Sildenafil Citrate as Viagra 100mg." },
              { q: "How long does shipping take?", a: "Standard shipping typically takes 2-3 weeks depending on your location & custom clearance process." },
              { q: "Is the packaging discreet?", a: "Absolutely. We do not write the contents of the package on the shipping label. It will appear as a standard parcel from a fulfillment center." },
              { q: "What if the medication doesn't work for me?", a: "Every body reacts differently. If you are not satisfied with the results, please contact our support team. We can suggest alternatives or discuss our refund policy." }
            ].map((item, idx) => (
                <details key={idx} className="group bg-white border border-slate-200 rounded-lg overflow-hidden open:ring-2 open:ring-blue-100 transition-all">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-semibold text-slate-800 hover:bg-slate-50">
                        {item.q}
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-fadeIn">
                        {item.a}
                    </div>
                </details>
            ))}
        </div>
      </section>

      {/* --- MEDICAL DISCLAIMER --- */}
      <div className="bg-slate-100 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
                <strong>Medical Disclaimer:</strong> The information provided on this page is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read on this website.
            </p>
        </div>
      </div>
    </div>
  );
};

export default MensHealthPage;