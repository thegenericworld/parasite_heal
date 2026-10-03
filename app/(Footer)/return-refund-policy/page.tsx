import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Return & Refund Policy | Parasite Heal",
  description:
    "Read the return and refund policy. Learn about eligibility for returns, refund timelines, and exceptions for prescription and bulk medicine orders.",
  alternates: {
    canonical: "/return-refund-policy",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800 ">
      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Return and refund policy
      </h1>

      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <p className="mb-4">
          If for some reason, your order is not delivered or is damaged in transit, we will ship you replacement or issue you a full refund as per your request. If however, you received a partial order, we will issue you a full refund, and then charged only for the product (s) you received.
        </p>
        <p className="mb-4">
          Parasite Heal has a 100% satisfaction guarantee. If for some reasons, you are not satisfy with the quality of the products, please contact us within 7 days of receiving the products and we will issue a free reshipment or refund for that product. Queries receiving after 7 days of delivery will not be entertained.
          We appreciate your kind understanding in this matter.
        </p>
        <p className="mb-4">
          Please allow 30 business days from the day the order was shipped. If after 30 days, you have not received the order, or if you received any notification that your order was on hold or returned to sender, please contact us and we act on your request promptly.If the consignment was returned to the pharmacy due to our fault, we will re-ship it at no additional charge. Please get in touch with us in either of the cases.
        </p>
        <p>
          Please Note: If you have any queries regarding your transaction, please contact us by sending a mail on <a href="mailto:ParasiteHeal@gmail.com" className="text-blue-600">ParasiteHeal@gmail.com</a>.
        </p>
      </div>
    </article>
  );
};

export default page;
