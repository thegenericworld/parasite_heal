import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Parasite Heal - Online Pharmacy",
  description:
    "Read the privacy policy to understand how we collect, use, and protect your personal information while ensuring safe and secure online medicine purchases.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: { index: true, follow: true },
};


const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800 ">

      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Privacy Policy
      </h1>

      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Policy for collection and sharing of online information of our
          customers
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            All the information that we collect from the customers such as their
            name, age, email id, phone number, and address are used only for
            official purposes.
          </li>
          <li>
            We are not engaged in the unauthentic process for sharing your
            information with any of our entities or even to any third party such
            as our vendors and wholesalers.
          </li>
          <li>
            All this is done to provide meaningful and efficient customer
            service to our customers. This is done to ease the process for the
            customers to help them gather information or while choosing to buy a
            certain medicine or during the payment or checkout process.
          </li>
          <li>
            This also saves their time as they don’t have to share their
            information time and time again at the time of purchasing the
            medicines from our portal.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Agreeing to the cookie policy on our portal
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            The use of cookies is done on our portal that helps in the faster
            buying and checks out the process for our customers.
          </li>
          <li>
            You can choose to agree with our cookie policy but that is solely at
            your discretion.
          </li>
          <li>
            By agreeing to make a transaction on our portal you also agree with
            our online cookie policy to store some of the vital information for
            faster browsing on our online portal.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Doing transactions on our portal
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            All our online transactions occur over a fast and efficient online
            payment portal that is protected by an SSL gateway for faster
            processing and authenticating the end beneficiary for the
            transactions.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Sharing your reviews
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>You may wish to share any of your experiences with us.</li>
          <li>
            This includes your reviews after using the medicine or even your
            experiences on finding out the right brand and dosage for medicine.
          </li>
          <li>
            You can also share your reviews on the payment and overall checkout
            process.
          </li>
          <li>
            We encourage you to share your experiences with us but this is not
            something that you have to mandatorily do in case you are willing to
            protect your anonymity.
          </li>
        </ul>
      </div>
    </article>
  );
};

export default page;
