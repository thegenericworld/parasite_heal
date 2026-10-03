import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Drug Policy | Parasite Heal - Online Pharmacy",
  description:
    "Read the Drug policy on the sale and distribution of medicines. Learn about prescription requirements, usage guidelines, safety measures, and compliance with regulations.",
  alternates: {
    canonical: "/drug-policy",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800 ">
      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Drug Policy
      </h1>

      <li>www.ParasiteHeal.com will not ship any narcotics or controlled substances including Benzodiazipines to any of it&apos;s Pharmacy Clients.</li>

      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Types of medicines that you can buy from our portal
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            We have one of the widest arrays of medicines that you can buy from
            our portal.
          </li>
          <li>
            For the ease of the customers, we have made various categories of
            disorders for which you can get all the well-recognized brands.
          </li>
          <li>
            Our range of medicines includes all types of drugs such as
            prescription drugs, generic drugs.
          </li>
          <li>
            We have covered a range of disorders and have a large number of
            medicines for each category that are manufactured by different
            pharma companies.
          </li>
        </ul>

        <p className="my-4">
          <strong>This includes-</strong>
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Erectile dysfunction</li>
          <li>Asthma</li>
          <li>Hepatitis C</li>
          <li>Herpes</li>
          <li>Diabetes</li>
          <li>Blood pressure problems</li>
          <li>
            HIV - AIDS
          </li>
          <li>Acne</li>
          <li>Migraine</li>
          <li>Cancer</li>
          <li>Infertility</li>
          <li>Alzheimer’s syndrome</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          How do we source the medicines?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>We source our medicines directly from the manufacturers.</li>
          <li>
            On some rare occasions, we also have to source them from the vendors
            and wholesalers but all of them are registered entities.
          </li>
          <li>
            We have entered into pacts or agreements with the pharma companies
            and wholesalers to buy medicines in bulk.
          </li>
          <li>
            This is why at Parasite Heal, we can offer you discounted rates for
            all the medicines.
          </li>
          <li>
            Our medicines are always of the highest quality as we ensure to buy
            them from the medicine manufacturing companies themselves.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Benefits of buying drugs on our portal
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            We assure the quality of the medicines bought from our portal.
          </li>
          <li>
            We ensure that you always get the best products at the lowest
            prices.
          </li>
          <li>We ensure discounts and offers on each purchase.</li>
          <li>
            You can get several payment options for buying the drugs on our
            portal.
          </li>
          <li>
            We ensure to give home delivery right at your doorstep for the
            bought medicines.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Ensuring the best quality of medicines at all times
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            Our customers are always ensured of the best quality of medicines
            bought from our portal.
          </li>
          <li>
            This assurance is delivered as we source all our medicines directly
            from the pharma companies themselves or sometimes their registered
            and authentic dealers and wholesalers.
          </li>
          <li>
            We ensure to conduct periodic checks and audits on our existing
            stock of medicines.
          </li>
          <li>
            This includes conducting the usability of the medicine, standard,
            and safety of taking in the medicine after assuring its quality.
          </li>
          <li>
            We focus mostly on the composition of the medicine to ensure that
            they remain the same despite staying in our logistical units for
            many days, weeks, or months.
          </li>
          <li>
            The other most important thing that we focus on is the expiry dates
            of the medicines.
          </li>
          <li>
            All these are check by a certified group of experts that includes
            doctors, and quality specialists that conduct the repeated checks
            and audits.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Cost of the medicines
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            The cost of the medicines is the same as they are declared and
            mentioned on the sachets of the medicines from the pharma companies.
          </li>
          <li>
            We make deals of large bulk orders and that is why we can give
            discounts and offers to our customers.
          </li>
          <li>
            These offers and discounts that we give are based on the volume of
            orders that we have made from the pharma companies and the rates
            that they have given us.
          </li>
          <li>
            We do not dictate the terms of costs for any of the medicines sold
            on our online portal.
          </li>
          <li>
            As we are a well-trusted global online portal for the sale and
            delivery of medicines you need to check out the cost of medicines
            and some other things such as delivery charges and taxes.
          </li>
          <li>
            These might vary from one country to another based on the prevailing
            prices in your region or country.
          </li>
          <li>
            But we offer the same prices for a specific medicine to all
            countries and regions that are served by us.
          </li>
          <li>
            One thing is for sure that at Parasite Heal you are going to get
            prices that you have not seen on any other portal.
          </li>
          <li>
            We give the best rates and quotes for medicines to our customers.
          </li>
          <li>
            Based on the type of medicine you are buying and your order volume
            you are going to get offers and discounts.
          </li>
          <li>
            Due to the availability of offers and deals all around the year the
            prices of the medicines might vary based on the stock that we have
            and the availability and demand of the medicines.
          </li>
        </ul>
      </div>
    </article>
  );
};

export default page;
