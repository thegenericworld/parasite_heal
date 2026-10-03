import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worldwide Shipping | Parasite Heal - Online Pharmacy",
  description:
    "We offer worldwide shipping so you can access affordable, high-quality medicines no matter where you are located.",
  alternates: {
    canonical: "/worldwide-shipping",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-7xl mx-auto px-6  py-10 mb-10 text-gray-800 font-sans text-lg bg-gray-100 rounded-lg">
      <h1 className="text-5xl font-bold mb-5 text-gray-900">
        Worldwide Shipping
      </h1>
      <section>
        <p>
          ParasiteHeal.com is your generic pharmacy portal of choice if you
          want to ship your medicines online in any part of the world. Although
          our online company is based in India we deliver medicines to each
          continent with a majority of our customers from the US, UK, Australia,
          Malaysia, and many other countries.
        </p>
        <p>
          To ship your orders, we make use of software and advanced technology
          to give you delivery always on time. Our online pharmacy is known to
          get the best ratings and good reviews from customers because we
          deliver on time.
        </p>
        <p>
          To ensure that there is zero delay in shipment of your products, our
          staff members work 24*7 in teams.
        </p>
        <p>
          Our back-end team that manages orders transfers each confirmed order
          to our logistic team which begins to pack your medicines.
        </p>
        <p>
          To be able to ship our pills to customers from any part of the world
          we have tied up with many large courier agents. Our online pharmacy
          portal gives you last-minute delivery where each package reaches right
          at the doorstep of the customer.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Delivering On Time And With 100% Accuracy
        </h2>
        <p>
          When you come to buy medicines on our website, you need to give us
          your <strong>Mobile Number</strong> and <strong>Email ID</strong> to
          be able to ship your orders. We use this information to send you
          regular updates about your order and its shipping status.
        </p>
        <p>
          During the time of delivery, our couriers will be in touch with you to
          take help and reach right at the address which you have given us.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">Faster Service</h2>
        <p>
          So far, we are known as an online pharmacy for giving faster service
          and handover on time. To solve this issue, we use software and the use
          of technology to get rid of any issues with sorting your order.
        </p>
        <p>
          Our team that handles orders and packaging gets details of your order
          and begins packing items on the go. From our end, your package is
          sealed and is out for handover within 24 hours when you make your
          order on our website.
        </p>
        <p>
          We also ensure the privacy of our customers, keep all your contact
          details with us, and do not allow third-parties to get access to it.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Get Updates On Your Orders From Our Portal
        </h2>
        <p>
          Our portal also allows you to track your package and get timestamps
          exactly where your package is. We also keep giving you updates and an
          estimate on how long it may take to hand over the package at your
          address.
        </p>
      </section>
    </article>
  );
};

export default page;
