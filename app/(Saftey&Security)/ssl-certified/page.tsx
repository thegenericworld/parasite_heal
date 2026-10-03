import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSL Certified | Parasite Heal - Online Pharmacy",
  description:
    "Our website is SSL certified, ensuring encrypted connections, secure transactions, and complete protection of your data.",
  alternates: {
    canonical: "/ssl-certified",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-7xl bg-gray-100 rounded-lg mx-auto px-6 py-10 mb-10 text-gray-800 font-sans text-lg">
      <h1 className="text-5xl font-bold mb-5 text-gray-900">SSL Certified</h1>
      <div>
        <p>
          Our website ParasiteHeal.com is certified as per SSL norms of the
          industry. This makes your connection secure to our servers when you
          are using a web browser. As per our SSL certificate website, this
          means that your connection occurs end-to-end with our browser and the
          exchange of data and information occurs in real-time.
        </p>
        <p>
          Millions of users visit our website each month from all over the world
          with the help of the internet. To make sure your connection is safe
          and secure with us we have made our website SSL certificate.
        </p>
        <p>
          This means that you can now safely connect with our web server and
          rely on an SSL certificate to transfer or exchange any data without
          having worries about phishing or digital fraud.
        </p>
        <p>
          By using an SSL certificate, we also establish our website as
          authentic and complete the norms as per the set standards in the
          industry. We ensure our SSL encryption prevents any type of spam
          connection using a web browser and trying to attack our website using
          malware, Trojans, or viruses.
        </p>
        <p>
          In simple words, it reduces the chances of hacking our website and
          getting our customer’s highly valuable and private data and
          transaction info.
        </p>
      </div>

      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Towards Ensuring The Safety Of The User
        </h2>
        <p>
          Our reason for making our website SSL certificate is for the benefit
          of our customers. See, we process hundreds of orders every minute.
        </p>
        <p>
          For each order, we get different information from the customers like
          their account details, details of transactions, orders, credit and
          debit card details, and personal info like mail, contact number,
          address, and so on.
        </p>
        <p>
          To make sure it is safely stored in our servers we use SSL encryption
          to connect with our visitors. This means that a P2P connection will
          take place which connects your IP using your web browser and connects
          it to our servers. It is a form of 1 to 1 private connection.
        </p>
        <p>
          Using this mode of connection allows you to safely give such
          confidential details without the risk of any online fraud. By using an
          SSL connection, we can get all the details without any phishing from
          an unknown third party using malware to access your data.
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-5 mb-5">
          Conducting Transactions Using SSL Technology
        </h2>
        <p>
          All payments are done using SSL encryption on our website. This means
          that your data travels using a private connection which is established
          with our end.
        </p>
        <p>
          All the details of the transaction can occur fast avoid any delays and
          safely without any rights to third parties to get access to such info.
        </p>
      </section>
    </article>
  );
};

export default page;
