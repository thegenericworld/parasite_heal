// app/medicines/page.tsx
import { Metadata } from "next";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
  popular?: boolean; // Added to highlight specific items
}

interface CategoryGroup {
  id: string; // For anchor navigation
  name: string;
  description: string;
  categories: Category[];
}

export const metadata: Metadata = {
  title: "Shop Medicines by Category - Generic & Branded Drugs",
  description:
    "Browse all medicine categories - men's health, diabetes, heart & BP, antibiotics, inhalers & more. Shop verified generic medications with fast delivery at Parasite Heal.",
  keywords:
    "online pharmacy catalog, buy antibiotics online, men's health medicines, generic viagra, diabetes medication, heart health drugs, cheap generic drugs",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/medicines",
  },
  openGraph: {
    title: "Shop Medicines by Category - Generic & Branded Drugs",
    description: "Browse all medicine categories - men's health, diabetes, heart & BP, antibiotics, inhalers & more. Shop verified generic medications with fast delivery at Parasite Heal.",
    type: "website",
  },
};

// Helper function to convert category name to slug
const toSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "mens-health",
    name: "Men's Health",
    description: "Solutions for ED, performance, and wellness",
    categories: [
      { name: "Erectile Dysfunction", slug: "mens-health", popular: true },
      // { name: "Generic Viagra", slug: toSlug("Generic Viagra") },
      // { name: "Sildenafil", slug: toSlug("Sildenafil - Blue Pill") },
      // { name: "Tadalafil", slug: toSlug("Tadalafil") },
      //  { name: "Vardenafil", slug: toSlug("Vardenafil") },
      // { name: "Cenforce", slug: toSlug("Cenforce") },
      // { name: "Vidalista", slug: toSlug("Vidalista") },
      // { name: "Fildena", slug: toSlug("Fildena") },
      // { name: "Kamagra", slug: toSlug("Kamagra") },
      // { name: "Malegra", slug: toSlug("Malegra") },
      // { name: "Suhagra", slug: toSlug("Suhagra") },
      // { name: "Vigora", slug: toSlug("Vigora") },
      // { name: "Zenegra", slug: toSlug("Zenegra") },
      // { name: "Tadarise", slug: toSlug("Tadarise") },
      // { name: "Levitra", slug: toSlug("Levitra") },
      // { name: "Filagra", slug: toSlug("Filagra") },
      // { name: "ED-Jelly", slug: toSlug("ED-Jelly") },
      // { name: "Chewable", slug: toSlug("Chewable") },
      // { name: "Climax Spray", slug: toSlug("Climax Spray") },
      // { name: "Herbal Medicines for Men's Sexual Health", slug: toSlug("Herbal Medicines for Men's Sexual Health") },
      { name: "Testosterone", slug: toSlug("Cernos") },
    ],
  },
  {
    id: "womens-health",
    name: "Women's Health",
    description: "Hormonal treatments, fertility, and care",
    categories: [
      { name: "Women's Health", slug: "womens-health" },
      // { name: "Female Viagra", slug: toSlug("Female Viagra") },
      { name: "Birth Control", slug: toSlug("Birth Control") },
      { name: "Infertility Therapy", slug: toSlug("Infertility Therapy") },
    ],
  },
  {
    id: "chronic",
    name: "Chronic Conditions",
    description: "Heart, diabetes, and blood pressure care",
    categories: [
      { name: "Heart & Blood Pressure", slug: toSlug("Heart & Blood Pressure"), popular: true },
      { name: "Diabetes", slug: toSlug("Diabetes") },
      { name: "Angina Pectoris Anti-Anginals", slug: "antianginals" },
      { name: "Anti Coagulants", slug: "anticoagulants" },
      { name: "Anti Convulsants", slug: "anticonvulsants" },
      { name: "Alpha Blockers", slug: toSlug("Alpha Blockers") },
      { name: "Osteoporosis", slug: toSlug("Osteoporosis") },
    ],
  },
  {
    id: "infections",
    name: "Infections",
    description: "Antibiotics, antifungals, and antivirals",
    categories: [
      { name: "Antibiotics", slug: toSlug("Antibiotics"), popular: true },
      { name: "Antiviral", slug: toSlug("Antiviral") },
      { name: "Antifungal", slug: toSlug("Antifungal") },
      { name: "HIV & Herpes", slug: toSlug("HIV & Herpes") },
      { name: "Anti Amebics", slug: "antiamebics" },
      // { name: "Anthelmintic & Anti-worm", slug: toSlug("Anthelmintic & Anti-worm") },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory & Allergy",
    description: "Asthma inhalers and allergy relief",
    categories: [
      { name: "Asthma", slug: toSlug("Asthma") },
      { name: "Allergy", slug: toSlug("Allergy") },
      //  { name: "Inhalers", slug: toSlug("Inhaler") },
      // { name: "Asthalin", slug: toSlug("Asthalin") },
      // { name: "Allegra", slug: toSlug("Allegra") },
    ],
  },
  {
    id: "pain",
    name: "Pain Relief",
    description: "Migraine, arthritis, and general pain",
    categories: [
      { name: "Pain Relief", slug: toSlug("Pain Relief") },
      { name: "Arthritis", slug: toSlug("Arthritis") },
      // { name: "Joint pain", slug: toSlug("Joint pain") },
      { name: "Anti Migraine", slug: "antimigraine" },
    ],
  },
  {
    id: "skin",
    name: "Skin & Beauty",
    description: "Acne, hair loss, and skincare",
    categories: [
      { name: "Beauty & Skin Care", slug: toSlug("Beauty & Skin Care") },
      { name: "Acne", slug: toSlug("Acne") },
      { name: "Hair Loss", slug: toSlug("Hair Loss"), popular: true },
      // { name: "Candid", slug: toSlug("Candid") },
    ],
  },
  {
    id: "digestive",
    name: "Digestive Health",
    description: "Acid reflux and stomach care",
    categories: [
      { name: "Gastro Health", slug: toSlug("Gastro Health") },
      { name: "Acid reducers", slug: toSlug("Acid reducers") },
      { name: "Anti Emetic", slug: "antiemetics" },
    ],
  },
  {
    id: "eye",
    name: "Eye Care",
    description: "Drops, gels, and vision health",
    categories: [
      { name: "Eye Care", slug: toSlug("Eye Care") },
      { name: "Eye Drops", slug: toSlug("Eye Drops") },
      // { name: "Eye Care Capsules", slug: toSlug("Eye Care Capsules") },
      // { name: "Eye Care Tablets", slug: toSlug("Eye Care Tablets") },
      // { name: "Eye Injections", slug: toSlug("Eye Injections") },
      { name: "Eye Ointment & Gel", slug: toSlug("Eye Ointment & Gel") },
    ],
  },
  {
    id: "mental",
    name: "Mental Health",
    description: "Neurological and cognitive support",
    categories: [
      { name: "Body & Mind", slug: toSlug("Body & Mind") },
      { name: "Alzheimers", slug: toSlug("Alzheimers") },
      { name: "Anti Parkinsonian", slug: "antiparkinsonian" },
      { name: "Alcohol & Drug Treatment", slug: toSlug("Alcohol & Drug Treatment") },
    ],
  },
  {
    id: "cancer",
    name: "Cancer Care",
    description: "Oncology support medications",
    categories: [
      { name: "Anti Cancer", slug: "anticancer" },
      { name: "Breast Cancer", slug: toSlug("Breast Cancer") },
    ],
  },
  {
    id: "other",
    name: "Other",
    description: "Specialized treatments",
    categories: [
      { name: "Bladder & Prostate", slug: toSlug("Bladder & Prostate") },
      { name: "Obesity & Weight Loss", slug: toSlug("Obesity") },
      { name: "Immune Booster", slug: toSlug("Immune Booster") },
      { name: "Herbal Supplements", slug: toSlug("Herbal") },
    ],
  },
];

export default function CategoriesPage() {

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medicine Categories",
    description: "Shop generic and branded medicines by health condition.",
    url: "https://ParasiteHeal.com/medicines",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ParasiteHeal.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Medicines",
          item: "https://ParasiteHeal.com/medicines",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-linear-to-b from-white to-blue-50 pt-10 pb-8 lg:pt-16 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li className="text-slate-900 font-medium">Medicines</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-semibold text-center">Browse by Categories</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-3">
          {CATEGORY_GROUPS.map((group) => (
            <details
              key={group.id}
              className="group overflow-hidden border-2 border-slate-200 rounded-xl bg-white transition-all duration-200 open:border-blue-600"
            >
              {/* --- Header: High Contrast --- */}
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none bg-slate-50 hover:bg-slate-100 transition-colors">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-wide mb-1">
                    {group.name}
                  </h2>
                  <p className="text-sm text-slate-600 font-medium leading-tight">
                    {group.description}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block text-xs font-bold text-slate-400 group-open:hidden">
                    VIEW ALL
                  </span>
                  <div className="text-slate-900 transition-transform duration-300 group-open:rotate-180">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </summary>

              {/* --- Content: Clear Clickable Targets --- */}
              <div className="p-4 bg-white border-t-2 border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.slug === "mens-health" ? `/${cat.slug}` : `/categories/${cat.slug}`}
                      className="flex items-center justify-between px-5 py-4 rounded-lg bg-slate-50 border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all group/item"
                    >
                      <span className="text-[15px] font-bold text-slate-800 group-hover/item:text-blue-700">
                        {cat.name}
                      </span>

                      {/* Visual cue that it is clickable */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          GO
                        </span>
                        <svg
                          className="w-5 h-5 text-slate-400 group-hover/item:text-blue-600 transform group-hover/item:translate-x-1 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </main>

      {/* --- SEO & INFO CONTENT (Bottom of page) --- */}
      <section className="bg-white border-t border-gray-200 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Your Guide to Buying Medicines Online
          </h2>
          <div className="prose prose-blue text-slate-600 max-w-none">
            <p className="mb-4">
              At Parasite Heal, we strive to make healthcare accessible and
              affordable. Our extensive catalog covers everything from chronic
              condition management to acute care. Whether you are looking for
              <strong> generic ED treatments</strong>,
              <strong> antibiotics</strong>, or daily maintenance medications
              for diabetes, we are here to help you!.
            </p>
            <p className="mb-4">
              <strong>Why Choose Generic Drugs?</strong>
              <br />
              Generic medicines contain the same active ingredients as branded
              drugs but cost a fraction of the price. They adhere to the same
              safety, dosage, and quality standards set by health authorities.
              By shopping with us, you save up to 70% on your monthly healthcare
              bills without compromising on efficacy.
            </p>
            <p>
              All orders are packaged discreetly and shipped worldwide. Browse
              our categories above or use the search bar to find specific
              medications.
            </p>
          </div>
        </div>
      </section>

      {/* --- TRUST SIGNALS --- */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Customer Testimonial */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-slate-300 italic mb-4">
              &quot;I&apos;ve been ordering from Parasite Heal for over 2 years. Always genuine products, fast shipping, and amazing savings compared to local pharmacies.&quot;
            </blockquote>
            <p className="text-slate-500 text-sm">— Michael R., United States</p>
          </div>
        </div>
      </section>

      {/* --- BACK TO TOP BUTTON --- */}
      <a
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>


    </div>
  );
}