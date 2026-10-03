import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "McAfee Protection | Parasite Heal - Online Pharmacy",
  description:
    "We safeguard your transactions with McAfee Protection, ensuring secure, private, and trusted online shopping every time.",
  alternates: {
    canonical: "/mcafee-protection",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        McAfee Protection
      </h1>
      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <p className="my-4">
          Parasite Heal, always wants its customers to know about making
          digital transactions safe. We want people to avoid any digital fraud
          and share data with unknown parties. To avoid your web browser of a
          sudden attack of Trojan or a virus we give you McAfee protection on
          our web server.
        </p>
        <p className="my-4">
          We allow your device to become safe using MacAfee antivirus to avoid
          leaking any major info to other parties. It is one of the well-known
          software programs that gives various services with all the latest
          upgrades and APIs.
        </p>
        <p className="my-4">
          Our job is to make your browsing safe on our portal so that you can
          get any service at the click of a button from our website.
        </p>
        <p className="my-4">
          Once you visit our website, it detects your IP and keeps it under
          monitor of any phishing, and other illegal acts. This is our way to
          not just keep our website safe from hackers but also make sure that we
          can provide you with better service at the time of getting orders,
          processing, and confirming payments.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          To Check If A Visitor Is Real
        </h2>
        <p className="my-4">
          Our antivirus protection helps us find out if any random visitor on
          our website is real or has an evil mind. If the system detects any
          issues, we try to block your server and break the P2P connection from
          our end so that you cannot visit our website let alone make any order.
          Our system can quickly detect and block such IPs to visit our website
          again in the future.
        </p>
        <p className="my-4">
          It is important to know that if McAfee already blocks you, you may not
          be able to visit our website if your IP does not get approved.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Giving You Transparent Service
        </h2>
        <p className="my-4">
          Enacting protection on our platform, helps us to make a reliable
          website. This establishes us as a genuine and approved website that
          provides legal services instead of digital and online frauds with our
          customers.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Keeps Our Data Server Safe
        </h2>
        <p className="my-4">
          Using it also allows our data servers to remain safe from any phishing
          or illegal access to data. It has features to auto-update to give 24*7
          protection to all the data and critical info that is stored in our
          data servers.
        </p>
        <p className="my-4">
          It stands as a wall to only allow the right access, storage, and
          update of info about customer details, payment details, orders, and so
          on.
        </p>
      </section>
    </article>
  );
};

export default page;
