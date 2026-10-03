import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Packaging | Parasite Heal - Online Pharmacy",
  description:
    "All medicines are shipped in secure, discreet packaging to protect product quality and ensure your privacy at every step.",
  alternates: {
    canonical: "/secure-packaging",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-7xl bg-gray-100 rounded-lg mx-auto px-6 py-10 mb-10 text-gray-800 font-sans text-lg">
      <h1 className="text-5xl font-bold mb-5 text-gray-900">Secure Packaging</h1>
      <div>
        <p>
          While giving you the delivery, each product is packed carefully. Our
          Secure Packaging and Logistics team that takes care of this
          responsibility ensures that each order is packed in standard packages
          to avoid any form of contamination.
        </p>
        <p>
          Our packing process allows you to get the package at home with no
          damage to the products and their effects. We always take proper care
          while sealing your medicines airtight in our specially designed
          packages, which are the basic norms in the industry.
        </p>
      </div>

      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Packaging Is Designed To Keep Medicines Safe From Weather Changes
        </h2>
        <p>
          Our specially designed packages go through a tight process where they
          are sealed. Each component of the package is designed by third-party
          vendors who are our partners.
        </p>
        <p>
          These packages are designed to allow medicines to last longer and are
          intact. After the process is complete each package does not allow any
          changes to make any impact on the effects of the pills. Whether it is
          heat, light, dust, or rain our package is highly resistant to the
          weather.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">Heat-Sealing Packages</h2>
        <p>
          During Secure Packaging, we heat seal the package to avoid medicines
          from spilling or getting rotten during delivery. We follow every
          standard norm in the pharma and healthcare industry that is set for
          packaging.
        </p>
        <p>
          A special process to seal the top of the package using thermal heat
          and seal tapes used in the medical industry keeps the bottles,
          sachets, or vials in place just as it is even during transit.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">Caution At The Time Of Receiving The Package</h2>
        <p>
          We follow all the standards and defined norms of Secure Packaging as
          per the industry. Despite this, since you are the customer, you have
          to check the package at the time courier delivers it to you.
        </p>
        <p>
          You have to check for any sign of tampering or damage to the package.
          On seeing any such sign, you need to reject delivery and tell it to
          the courier agent who is present there. You must mention it to us as
          well.
        </p>
        <p>
          If the outside package is fine, you must check for any sign of damage
          or spill inside the package and report it within the time a delivery
          executive is present.
        </p>
        <p>
          If you see signs of any damage or spoil report it to us. In this case,
          you need to reject the delivery and inform us, and we will refund your
          order or process it again free of cost.
        </p>
      </section>
    </article>
  );
};

export default page;
