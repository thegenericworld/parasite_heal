import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "24/7 Service | Parasite Heal - Online Pharmacy",
  description:
    "Get round-the-clock support with our 24/7 service, ensuring you always have access to medicines and assistance when you need it most.",
  alternates: {
    canonical: "/24-7-service",
  },
  robots: { index: true, follow: true },
};
const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
       <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        24*7 Service
      </h1>
      <section className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <p className="my-4">
          Parasite Heal is an online pharmacy that is in regular touch
          with its customers. You can reach our services round the clock from
          any part of the globe. We provide our online service through our
          website <strong>ParasiteHeal.com</strong> where you can make orders
          at any time. Plus, we also give you the chance to be able to speak
          with our staff at any time via E-mail.
        </p>
        {/* <p>
          We are also present on our 24*7 Service helpline number where
          customers can call any time and get updates on their orders and clear
          their doubts about any medicine and other health products listed on
          our portal.
        </p> */}
      </section>

      <section className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Order Anytime On Our Website
        </h2>
        <p className="my-4">
          We do not have any downtime on our website. It is always live for sale
          24*7 Service each day of the year. Visitors can come and check about
          different pills on our website and make orders online any time of the
          day or night.
        </p>
       <p className="my-4">
          With the use of high-end technology, we do not need manual approval
          for your orders. Each order is approved with the help of high-end
          software and technology. This enables us to reduce the time to process
          your order and give final billing details.
        </p>
      </section>
      {/* <section className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Call Us To Clear Up Your Doubts
        </h2>
        <p>
          You can also get in touch with us through email, and telephone any
          time. Our customer helpline number is also running round the clock to
          help customers give any information they want.
        </p>
        <p>
          You can get in touch with our staff and ask for any information about
          our pills, or any other query that you have, like giving you details
          of your order, and track your orders and tell you about their status.
        </p>
      </section> */}
      <section className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
       <h2 className="text-xl font-semibold mt-10 mb-5">
          Check Your Order Any Time
        </h2>
        <p className="my-4"> 
          We allow customers to track their orders using our Track Orders
          section. You just need to mention details about your bills and order
          number, find out details of your package, and know exactly where it is
          in the logistic chain.
        </p>
      </section>
    </article>
  );
};

export default page;
