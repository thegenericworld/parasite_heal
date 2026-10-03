import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Secured with AWS | Parasite Heal - Online Pharmacy",
  description:
    "Your data is safeguarded with AWS security standards, ensuring privacy, reliability, and trusted protection at all times.",
  alternates: {
    canonical: "/data-secured-with-aws",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Data Secured With AWS
      </h1>
      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <p className="my-4">
          We use AWS services on the go to secure your data in real time. We use
          Amazon’s in-house web services that allow us to access cloud storage
          and other benefits to store your personal and critical data.
        </p>
        <p className="my-4">
          Since AWS is one of the best providers of such services, we use their
          services to gain cloud storage and store data about your orders,
          customer details, time stamps, and other critical information about
          payment details.
        </p>
        <p className="my-4">
          Your data is safe in our AWS cloud storage and is free from any access
          to third parties.
        </p>
        <p className="my-4">
          Our mission is to make you feel total trust when you choose us as your
          healthcare provider. If you have any doubts about our services,
          remember that we use the latest AWS APIs, software tools, and IoT to
          store and manage your info.
        </p>
        <p className="my-4">
          Using AWS services also helps us to gain extra cloud storage and keep
          our expenses low. This helps us to spend more in scaling our services
          and make our services more affordable to you.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">Collection And Storage Of User Data</h2>
        <p className="my-4">
          Each data that we get from our customers at the time of their orders
          is stored using the AWS storage. This ensures that by using AWS safety
          features for cloud storage your data becomes reliable and free of
          third-party access.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">Easy Access To Data</h2>
        <p className="my-4">
          Not only does it help us gain space for storage, but using AWS
          services also helps manage and access such info at any time if it is
          needed. For example, it helps us to identify and save your details
          which saves your time while making an order for our website.
        </p>
        <p className="my-4">
          Even more important is the fact that using AWS services allows us to
          get easy access to data during any dispute, cancellation, and refunds.
          Using AWS standards and advanced safety features saves time in
          accessing data for any patient.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">Protection Of Your Data</h2>
        <p className="my-4">
          Using AWS also gives an extra layer of security to your data. Since it
          has its safety protection middleware and APIs, it can detect any
          unauthorized data access and avoid tampering with user data and other
          critical details.
        </p>
        <p className="my-4">
          We always strive to make sure your data is safe and secure with us and
          that is exactly why we use AWS for data, storage, access, and up to
          date.
        </p>
      </section>
    </article>
  );
};

export default page;
