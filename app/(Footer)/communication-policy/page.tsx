import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Communication Policy | Parasite Heal - Online Pharmacy",
  description:
    "Read the communication policy. Learn how we interact with customers, handle inquiries, ensure privacy, and provide timely updates about orders and services.",
  alternates: {
    canonical: "/communication-policy",
  },
  robots: { index: true, follow: true },
};

export default function CommunicationPolicyPage() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800 ">
       <h1 className="text-slate-700 text-xl md:text-xl font-bold text-left flex mb-6 md:mb-10 mt-2">
        <div className="w-1 h-8 bg-linear-to-b from-sky-400 to-blue-500 rounded-full mr-4 "></div>
        Communication Policy
      </h1>
    
      <p className="mb-4">
        Our customers need to read out the terms of{" "}
        <strong>our communication policy</strong> to get an idea about how we
        shall be communicating with them. It is important to understand that we
        will communicate with the customer at different times once an order is
        made on our portal.
      </p>
      <p className="mb-4">
        From the time of
        <strong> verifying your mobile number</strong> when making your order to
        the time of final delivery, there are different stages during which we
        shall send text messages to your{" "}
        <strong>registered mobile number with us.</strong>
      </p>
      <p>
        We also give our customers the freedom to communicate with us through{" "}
        <strong>EMAIL</strong> (
        <strong>
          {/* <span style="color: #008000;">info@ParasiteHeals.com</span> */}
        </strong>
        ) and by phone on our customer{" "}
        <strong>
          HELPLINE NUMBER []
          {/* <span style="color: #008000;">+1 (256) 921-3690</span>] [ */}
          {/* <span style="color: #008000;">+1 (256) 664-4170</span>] */}
        </strong>
        .
      </p>

      <div className="prose prose-li:marker:text-gray-700 prose-headings:text-gray-900">
        <h2 className="text-xl font-semibold mt-10 mb-5">
          Methods Of Communication Policy
        </h2>
        <p className="mb-4">
          For communication from our end, we shall{" "}
          <strong>send you text messages only</strong>. However, only during one
          time we may call you that will be if our delivery correspondent is not
          able to track your address.
        </p>
        <p>
          For you to contact us, you can take the help of a phone and call us on
          our helpline number round the clock or else email your issues to us.
        </p>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          When Do We Send Messages?
        </h2>
        <p className="mb-4">
          As we told you we shall communicate with you only using messages but
          those will be at different times such as
          <strong> Order processing</strong>, this is the first time when we
          shall ask you to give your mobile number, and we shall verify it with
          an OTP.
        </p>
        <p className="mb-4">
          Order confirmation is when you have made the order on our
          <Link href="https://ParasiteHeal.com/" className="text-blue-700">
            <strong> ParasiteHeal.com </strong>
          </Link>
          Website.
        </p>
        <p className="mb-4">
          <strong>After despatch</strong>, which is when your package of
          medicines is despatched at your given address and departs from our
          facility.
        </p>
        <p>
          <strong>On the final day of delivery</strong>, before you receive the
          package at home.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Providing Assistance And Support
        </h2>
        <p className="mb-4">
          We understand that despite regular communication from our end you must
          have some queries and doubts all the time. In addition, this is why we
          have the option where <strong>you can contact us at any time</strong>.
          You can contact us over email and write down your queries or give ✍️
          <strong> your feedback to us </strong>.
        </p>
        <p>
          Or else you can just give us a call and talk with our executives if
          you need any type of support.
        </p>
        <h2 className="text-xl font-semibold mt-10 mb-5">
          The Importance Of An Effective Communication Policy
        </h2>
        <p className="mb-4">
          The importance of effective communication is the key to being able to
          get out services. In case you give us a false mobile number or if the
          same is not reachable, the messages will not be transferred, and we
          shall not be liable for it.
        </p>
        <p className="mb-4">
          It is important to keep your mobile number active so that you can get
          these messages at different times until you get the package right at
          your home.
        </p>
        <p>
          It is only for your convenience that we send you the messages so that
          you do not have to worry about tracking your order all the time.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-5">
          Doing What We Don&#8217;t
        </h2>
        <p className="mb-4">
          Even though we communicate with you through messages, remember that
          our company or even our executives will not ask for any confidential
          details.
        </p>
        <p className="mb-4">
          This includes the likes of{" "}
          <span style={{ color: "#808000;" }}>
            <strong>credit </strong>
          </span>
          or
          <span>
            <strong> debit card PINs, OTPs, CVV, card expiry dates, </strong>
          </span>
          and so on. We encourage you to be aware of these frauds to be able to
          identify the scammers.
        </p>
      </div>
    </article>
  );
}
