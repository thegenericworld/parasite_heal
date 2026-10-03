import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions | Parasite Heal - Online Pharmacy",
  description:
    "Read the terms and conditions. Understand the rules, responsibilities, and legal guidelines for using our website and purchasing medicines online.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-slate-700 text-xl md:text-2xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Terms &amp; Conditions
      </h1>

      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <ul className="list-disc ml-6 space-y-2">


          <li>
            The product information provided on our portal is only for
            suggestive use and thus we do not provide it as any form of
            recommendation.
          </li>
          <li>
            The pictures posted on the product description page are for
            reference purposes only.
          </li>
        </ul>

        <section>
          <h2 className="text-xl font-semibold mt-10 mb-5">
            Your Personal Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              We at ParasiteHeal.com recognize your right to confidentiality and are committed to protecting your privacy. We use the information that we collect on our site to provide you with a superior shopping experience. When you order, we will ask your name, e-mail address, mailing address, as well as certain other information.
            </li>
            <li>
              We protect your information against unauthorized access or release. We will not give any identifiable personal information to any third party, unless we are legally required to do so.
            </li>
            <li>
              By using our Web site, you consent to the collection and use of this information by ParasiteHeal.com. If we ever change our privacy policy, we will post any changes on this page so that you are always aware of the information that we collect, how we use it, and under what circumstances we disclose it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-10 mb-5">
            Shipping package to your home
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Our delivery team handles the shipping after you place an order.
            </li>
            <li>
              In cases of invalid address or untraceable consignee, the order is
              canceled and returned.
            </li>
            <li>
              No refund will be made unless the customer contacts us with new
              shipping details or refund request.
            </li>
            <li>Second shipping incurs extra delivery charges.</li>
            <li>
              Delivery delays can occur due to weather or internal logistical
              issues.
            </li>
            <li>We are not liable for such delays.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-10 mb-5">Customs delay</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Packages may be held at customs in airports or ports.</li>
            <li>We are not responsible for delays due to customs.</li>
            <li>Customers must pay any customs duties applied.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-10 mb-5">Pricing policy</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              The pricing mentioned on our portal is subject to change based on
              our inventory, and the prevailing
              market rate of medicines.
            </li>
            <li>We do not negotiate prices displayed on the website.</li>
            <li>All offers shown are the maximum applicable discounts.</li>
          </ul>
        </section>

      </div>
    </article>
  );
};

export default page;
