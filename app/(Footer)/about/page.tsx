import { Metadata } from "next";
import Image from "next/image";
import heroImage from "../../../public/hero.png";

export const metadata: Metadata = {
  title: "About Us | Parasite Heal - Your Trusted Online Pharmacy",
  description:
    "Parasite Heal is a premier global online pharmacy dedicated to making high-quality generic and branded medicines accessible and affordable for everyone.",
  alternates: {
    canonical: "/about",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About Parasite Heal - Making Healthcare Accessible",
    description: "Join 10,000+ customers worldwide who trust us for affordable, quality medicines.",
  },
};

const Page = () => {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-sky-200 opacity-8 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-sky-100 opacity-6 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column - Text Content */}
            <div className="lg:text-left space-y-6">

              <h1 className="text-slate-900 text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                About Us
              </h1>

              <p className="md:text-lg text-slate-700 leading-relaxed text-justify">
                Parasite Heal is a mass distributor of generic drugs and OTC healthcare items since 2019. We have proudly been providing quality service and products to consumers all over the world.
              </p>

              <p className="md:text-lg text-slate-700 leading-relaxed text-justify">
                When you order from us, you never have to compromise quality or reliability. Our professionally managed company is headed up by a top-rated qualified <strong>Indian pharmacy</strong>, offering only the best value in generic drugs and brands.
              </p>

              <p className="md:text-lg text-slate-700 leading-relaxed text-justify">All of the drugs we distribute meet and conform to manufacturing and quality control world-class standards. All brands offered by Parasite Heal are manufactured in approved facilities by the World Health Organization (WHO)</p>

            </div>

            {/* Right Column - Image */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-[280px] h-[360px] md:w-[420px] md:h-[540px] lg:w-[400px] lg:h-[500px]">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={heroImage}
                    alt="ParasiteHeal - Making healthcare accessible worldwide"
                    fill
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 420px, 400px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* Mission & Vision */}
        <section className="py-16 border-b border-gray-200">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Navigating healthcare can be complex. We are committed to providing a straightforward, transparent service where you can source your prescribed treatments safely and affordably, without unnecessary hurdles.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                A world where no patient is denied treatment due to lack of access. We connect top-tier pharmaceutical manufacturers directly to you, ensuring the chain of care remains unbroken, efficient, and reliable.
              </p>
            </div>
          </div>
        </section>

        {/* Quality & Safety Standards */}
        <section className="py-10 border-b border-gray-200">

          <h2 className="text-center my-6 text-2xl font-semibold">Quality & Safety Standards</h2>

          <ul className="text-lg space-y-6 max-w-5xl mx-auto list-disc list-inside">

            <li className=" text-gray-700 leading-relaxed">
              <strong>Certified Quality:</strong> All medications are procured directly from reputable, licensed pharmaceutical manufacturers to guarantee authenticity and prevent tampering.
            </li>

            <li className="text-gray-700 leading-relaxed">
              <strong>Pharmacist Verification:</strong> Every order is physically inspected by our in-house dispensing team to ensure the correct medication, dosage, and expiration dates are met.
            </li>

            <li className="text-gray-700 leading-relaxed">
              <strong>Secure Transactions:</strong> We use industry-standard encryption for all data processing. Your financial details are never stored directly on our servers.
            </li>

            <li className="text-gray-700 leading-relaxed">
              <strong>Confidentiality:</strong> Secure data handling and discreet packaging ensuring that only you have access to the contents of the package.
            </li>

          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="py-10 border-b border-gray-200">
          <h2 className="text-center my-6 text-2xl font-semibold">What sets us apart</h2>

          <ul className="text-lg space-y-6 max-w-5xl mx-auto list-disc list-inside">

            <li className="text-gray-700 leading-relaxed">
              <strong>5000+ Medicines in Stock:</strong> We stock a comprehensive range of prescription and generic drugs. From common ailments to specialized treatments - finding your medication is straightforward here.
            </li>

            <li className="text-gray-700 leading-relaxed">
              <strong>Fast Delivery:</strong> Our global logistics network ensures your medicines reach you on time. International shipments typically arrive within 7-15 working days.
            </li>

            <li className="text-gray-700 leading-relaxed">
              <strong>Simplified Buying Process:</strong> Our platform offers expert-drafted medical information, bulk buying discounts, and secure checkout with multiple payment options. No complicated procedures.
            </li>

            <li className="text-gray-700 leading-relaxed">
              <strong>Affordable Pricing:</strong> Save up to 80% compared to US retail prices.
            </li>
          </ul>
        </section>

        <section className="py-10 border-b border-gray-200 max-w-5xl mx-auto">
          <h2 className="text-center my-4 text-2xl font-semibold">Manufacturers</h2>
          <p className="mb-4 text-lg">
            We order our drugs from reputed international manufacturers and are made available for sale after careful auditing of the quality parameters. This way, we spend more time and effort to help you when you buy medicine online. Some drugs are sold with different brand names in some countries, but they are generally the same drugs with similar active ingredients and efficacy.
          </p>

          <p>
            Sun Pharmaceutical Inds. Ltd. | Cipla Ltd. | Dr. Reddy&apos;s Laboratories Ltd. | Torrent Pharmaceuticals Ltd. | Abbott India Ltd. | Nicholas Piramal India Ltd. | Aurobindo Pharma Ltd. | Glaxosmithkline Pharmaceuticals Ltd. | Lupin Ltd. | Cadila Healthcare Ltd. |  Wockhardt Ltd. | Aventis Pharma Ltd. | Orchid Chemicals & Pharmaceuticals Ltd. | Ipca Laboratories Ltd. | Alembic Ltd. | Pfizer Ltd. | Morepen Laboratories Ltd. | U S V Ltd. | Matrix Laboratories Ltd. | Biocon Ltd. | Novartis India Ltd. |  Ranbaxy Laboratories Ltd.
          </p>
        </section>

      </div>
    </main>
  );
};

export default Page;