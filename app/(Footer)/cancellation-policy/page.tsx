import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Parasite Heal - Online Pharmacy",
  description:
    "Read the cancellation policy. Learn how to cancel orders, refund timelines, and exceptions for prescription and bulk medicines.",
  alternates: {
    canonical: "/cancellation-policy",
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800 ">
      <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Cancellation Policy
      </h1>


      <p className="mb-4 ">
        Our cancellation policy allows the customer to cancel their package
        provided they meet certain conditions. We encourage the customer to read
        our cancellation policies to ensure they know about the rules of
        cancellation.
      </p>

      <p className="mb-4 ">
        Although we will never ask you to cancel orders from us as we do have a
        quite good company reputation in bringing customer satisfaction but the
        same may not hold for you.
      </p>

      <p className="mb-4 ">
        Also sometimes there are external factors that leave the customer no
        other option than to cancel the order.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        How to cancel orders on our portal?
      </h2>

      <p className="mb-4 ">
        You have to mail us at: <a href="mailto:ParasiteHeal@gmail.com" className="text-blue-600">ParasiteHeal@gmail.com</a> with your Order ID and cancellation reason. Our team will verify your cancellation request and if it meets our cancellation policy norms then we will proceed with the cancellation of your order.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        How do we refund our cancellation orders and requests?
      </h2>

      <p className="mb-4 ">
        First, upon receiving any cancellation order, we track whether they are
        meeting our cancellation policy norms. Then we check out the order
        volume and call our delivery and logistic team to proceed further with
        the shipment.
      </p>

      <p className="mb-4 ">
        Then as far as the refunding process is considered we do not pay any
        refunds by cash or drafts. We only pay you back online directly to your
        account. Thus the customers will have to send their bank account numbers
        and all other information for us to make the payment.
      </p>

      <p className="mb-4 ">
        We do not stand liable under any circumstance if the bank account
        information is wrong or invalid.
      </p>

      <p className="mb-4 ">
        Also, you will have to wait for a minimum period of 7 working days from
        the day you placing the online cancellation order on our portal till the
        time we process the order.
      </p>


      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        What is not refunded back?
      </h2>

      <p className="mb-4 ">
        In no circumstances do we refund you the taxes and the customs duty or
        any other charges that are levied by the government as a part of
        taxation rules in your country or state. Please note that you cannot
        also hold us liable for this.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        In which cases does the cancellation policy work?
      </h2>

      <p className="mb-4 ">
        So, once you have gone through the above information which is important
        let’s look at the conditions or scenarios where you can cancel your
        orders and what are the conditions for meeting our guidelines.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        Cancellation due to product out of stock
      </h2>

      <p className="mb-4 ">
        This is when your order will be canceled automatically from our end.
        This is one of the few cases where we will cancel your order if the
        medicines that you have ordered are not within our current stock.
      </p>

      <p className="mb-4 ">
        On our portal, we will try and respect your order by providing any
        partial orders if that is within our capabilities and if the medicine is
        partially available in our stock.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        Cancellation of order due to non-receipt of payment
      </h2>

      <p className="mb-4 ">
        There are times when we have to cancel the order automatically if you
        don’t pay us after placing your order. See, you will be receiving a
        temporary mail when you finalize your order. After this we will send you
        an email with your total bill or invoice which is the final confirmation
        bill after accepting all your orders.
      </p>

      <p className="mb-4 ">
        It is expected that the customer will visit the online portal and then
        pay the required amount using the various online modes.
      </p>

      <p className="mb-4 ">
        But if this is not done then we will cancel your order after 24 hours
        automatically.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        Cancellation due to delay in order delivery
      </h2>

      <p className="mb-4 ">
        At times the customer may feel that the time taken for delivery is too
        long and is not satisfied with our courier and logistics service
        delivery time management.
      </p>

      <p className="mb-4 ">
        Remember, that you can place your cancellation order with us any time
        during the transit. But there are times when we may not refund you in
        full and deduct any charges such as customs duty if your package had
        already reached the customs center in your country.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        Cancellation due to wrong product delivery
      </h2>

      <p className="mb-4 ">
        Of course, we are liable if you have received a wrong brand or incorrect
        dose of medicines apart from the one you ordered.
      </p>

      <p className="mb-4 ">
        Remember that after you have received the delivery of your package and
        found that a wrong product or dose has been delivered you have a maximum
        time of 7 days in which to reach us and place a cancellation and refund
        request. Any request received after 7 days will not be entertained.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
        Cancellation due to tampered product
      </h2>

      <p className="mb-4 ">
        If the product is tampered with in any way you can call us and inform
        the same and place a cancellation and refund request provided the same
        is done within 7 days again.
      </p>
    </article>
  );
};

export default page;
