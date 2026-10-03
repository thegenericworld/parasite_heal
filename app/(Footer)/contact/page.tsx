import { Metadata } from "next";
import {
  Mail,
} from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Parasite Heal",
  description:
    "Get in touch with Parasite Heal support team. Email us, request a callback, or send a direct message for order assistance.",
  alternates: {
    canonical: "/contact",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
   <div className="bg-slate-50 min-h-screen antialiased">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Header */}
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              We&apos;re Here to Help!
            </h1>
            <p className=" text-slate-800 leading-relaxed">
              If you need any kind of help regarding your order, have a question about our products, or want to report an issue, please don&apos;t hesitate to reach out to us.
            </p>
          </div>

          {/* Quick Contact Card */}
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all hover:border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">For a response within 8 hours, email us at:</p>
                <a
                  href="mailto:ParasiteHeal@gmail.com"
                  className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors break-all"
                >
                  ParasiteHeal@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Alternative Response Channels Info */}
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-3 text-slate-600">
            <p>
              You can also fill out the contact form below to send us a direct message. 
            </p>
            <p>
              Expect a response from our support team within <strong className="text-slate-900 font-semibold">8 hours</strong> via <strong className="text-slate-900 font-semibold">Email</strong>.
            </p>
            <p>
              If you prefer a response through other channels like <span className="font-medium text-slate-800">Call, Text Message, WhatsApp,</span> or <span className="font-medium text-slate-800">Telegram</span>, just mention your preference in your message.
            </p>
          </div>

          {/* Form Section */}
          <div className="mt-12">       
            <ContactForm />
          </div>

        </div>
      </main>
    </div>
  );
}