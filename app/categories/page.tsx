// app/categories/page.tsx
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Category {
  id: number;
  name: string;
  slug: string;
}

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(`${BASE_API_URL}/products/categories`);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // fallback to empty array
  }
};

export const metadata: Metadata = {
  title: "Shop All Medicine Categories - Generic & Branded Drugs | ParasiteHeal",
  description:
    "Browse our complete range of medicine categories. Shop authentic generic and branded medications at up to 70% off with fast, discreet worldwide delivery.",
  keywords: "medicine categories, generic drugs online, branded medicines, pharmacy categories, buy medicines online, erectile dysfunction, pain relief, diabetes care",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Shop All Medicine Categories | Parasite Heal",
    description: "Browse authentic medications by category. Save up to 70% on genuine generic and branded drugs.",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50">

      {/* Main Categories Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right medication for your needs. All products are sourced from certified manufacturers and verified for authenticity.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Categories</h3>
            <p className="text-gray-600 mb-6">
              We&apos;re having trouble loading the categories. Please try again in a moment.
            </p>
            <Link
              href="/categories"
              className="inline-flex bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry Now
            </Link>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl text-gray-800 rounded-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative p-6 text-center">
                    {/* Icon */}
                    {/* <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(cat.name)}
                    </div> */}
                    
                    {/* Category Name */}
                    <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    
                    {/* Shop Now Link */}
                    <div className="inline-flex items-center text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Shop Now</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Category Count */}
            <div className="text-center mt-12">
              <p className="text-gray-600">
                Showing <span className="font-bold text-blue-600">{categories.length}</span> medicine categories
              </p>
            </div>
          </>
        )}
      </main>

      {/* Why Shop With Us Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Shop With ParasiteHeal?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Your trusted partner for authentic, affordable medications delivered worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏅',
                title: '100% Authentic',
                description: 'All medications sourced from certified manufacturers with quality guarantee'
              },
              {
                icon: '💰',
                title: 'Best Prices',
                description: 'Save up to 70% compared to local pharmacies without compromising quality'
              },
              {
                icon: '🌍',
                title: 'Worldwide Delivery',
                description: 'Fast, discreet shipping to your doorstep anywhere in the world'
              },
              {
                icon: '🔐',
                title: 'Secure & Private',
                description: 'SSL encrypted checkout and discreet packaging for your privacy'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/contact"
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Need Help? Contact Us
              </Link>
              <Link 
                href="/faq"
                className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-400">Authentic Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">4.8/5</div>
              <div className="text-gray-400">Customer Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
