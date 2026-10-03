import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lowest Price | Parasite Heal - Online Pharmacy",
  description:
    "Get the lowest prices on generic and branded medicines, making healthcare affordable without compromising on quality or safety.",
  alternates: {
    canonical: "/lowest-price",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Lowest Price
      </h1>
      <section className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <p className="my-4">
          Parasite Heal is an online pharmacy that is known to customers
          to offer some really good discounts. We always offer a fair and
          transparent Lowest Price on all our pills and health products. You may
          check out other portals as well, but the discount that you can get
          here is on the next level.
        </p>
        <p className="my-4">
          As a company selling medicines, our main aim is to make our products
          reach the general people who are in need.
        </p>
        <p className="my-4">
          We try to help patients afford a range of medicines from our website.
          For this, we offer a highly competitive and Lowest Price on all brands
          of pills listed on our portal.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Guarantee Of Lowest Price
        </h2>
        <p className="my-4">
          Our pricing offers are dynamic and based on demand. You may see the
          Lowest Price change at times, which makes a fair adjustment to the
          demand.
        </p>
        <p className="my-4">
          Our portal assures visitors to get a good offer each time buying pills
          on our portal. So, while you are busy making your order, check out the
          discounts we have for each medicine and avail it.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Short-Term Discount Offers
        </h2>
        <p className="my-4">
          Each brand of pills listed on our portal has short-term offers that
          only last for a certain period. To get this offer, a visitor must
          check the terms and conditions, especially the tenure till which
          offers last. We will not be responsible if you miss the last date to
          avail yourself of the offer.
        </p>
        <p className="my-4">
          We do not count those orders which get canceled due to any reason plus
          any medicines that are added to your cart, but you have not completed
          the order process.
        </p>
        <p className="my-4">
          Only after you get a final order confirmation from our end will you be
          eligible to get the offer.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Getting Partner Bank And Payment Offers
        </h2>
        <p className="my-4">
          We have been tied up with large banks and payment portals in many
          countries. To get these back and payment offers a visitor has to pay
          with our partner bank or payment portal only to get such offers.
        </p>
        <p className="my-4">
          Our bank offers also have their terms which you must go through
          properly to know when and how to get it. If your orders or payment
          modes do not match with the criteria as per our merchant banks you
          will not be able to get the offer.
        </p>
        <p className="my-4">
          Some offers are available on a certain order amount. So, make sure to
          check it before making any order. In such offers, you have to order
          medicines beyond a certain amount of money to get the discount.
        </p>
      </section>
    </article>
  );
};

export default page;
