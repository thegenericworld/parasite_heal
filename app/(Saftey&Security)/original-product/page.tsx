import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Original Product | Parasite Heal - Online Pharmacy",
  description:
    "We deliver only 100% original, high-quality medicines sourced from trusted manufacturers to ensure your safety and health.",
  alternates: {
    canonical: "/original-product",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-7xl bg-gray-100 rounded-lg mx-auto px-6 py-10 mb-10 text-gray-800 font-sans text-lg">
      <h1 className="text-5xl font-bold mb-5 text-gray-900">
        Original Product
      </h1>
      <div>
        <p>
          ParasiteHeal.com is a registered online portal that sells only
          original medicnies from its website. We are an online drug portal that
          has in place different approvals and tie-ups with large distributors
          and pharmaceutical companies. Our job is to act as their online
          partners to sell their brands.
        </p>
        <p>
          We claim the benefits of the pill or any other Original Product only
          as per the labels and standards of efficacy in the medical industry.
          We do proper research for each product before describing the pill on
          our website.
        </p>
      </div>

      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Get Original Medicines Online At ParasiteHeal.com
        </h2>
        <p>
          We are not involved in selling any medicine that is sourced from
          third-party vendors, local offline markets, and so on.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Complete Original Product Testing
        </h2>
        <p>
          All medicines and healthcare items that are listed on our website are
          tested by our in-house group of experts and doctors. Before listing
          any random medicines on our website, it goes through a round of checks
          where the standard and effects of the medicines are tested to find out
          about their claims.
        </p>
        <p>
          Only after reviews from our healthcare team of medicine experts and
          doctors do we sell it to our customers online.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Contents About Medicine
        </h2>
        <p>
          The description of any medicine is created by expert content writers
          who have enhanced ideas about such Original Product with a proper
          educational background. To establish any effects of the medicine we do
          a robust ground study of its efficacy, norms, and standards set in the
          industry.
        </p>
        <p>
          We study online reports, journals, and case studies from different
          online sources based on which each Original Product description is
          written on our portal.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">Claims On Effects</h2>
        <p>
          We do not claim any medicine to have good effects on people using it.
          We only provide detailed information about the medicine. In no way can
          you hold us responsible for getting side effects or low efficacy of
          the medicine after having it.
        </p>
        <p>
          We do not give you any guarantee that using our medicines can help you
          recover from your health issues. Our goal is only to give you the
          right information about the medicine and its effects. To get the right
          effects of the medicine you need to consult with a doctor and find out
          if it is suitable.
        </p>
      </section>
    </article>
  );
};

export default page;
