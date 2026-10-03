// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";

// import sslBadge from "../../public/Home/Safety & Security/SSL-Certified.jpg";
// import mcafeeBadge from "../../public/Home/Safety & Security/McAfee-Secure.jpg";
// import awsBadge from "../../public/Home/Safety & Security/Data-Secured-With-AWS-01.png";

/**
 * Same palette as the header, footer and logo:
 *   #0080C1 primary blue · #201D62 navy · #F2F9FD tint
 *
 * The structure is a process, not a badge wall. A row of vendor logos asserts
 * trust; describing exactly what happens to a parcel demonstrates it.
 */

const STEPS = [
  {
    title: "A pharmacist checks your order",
    text: "Our in-house dispensing team inspects the medicine, the dosage and the expiry date before anything is packed. If it doesn't match your order, it doesn't ship.",
  },
  {
    title: "It is sealed without markings",
    text: "Heat-sealed and tamper-evident, with no medical labels, brand names or logos on the outside. The courier can't tell what's inside either.",
  },
  {
    title: "It leaves within 24 hours",
    text: "Confirmed orders are handed to the courier the same or next working day, and a tracking link goes to your email. Most international orders arrive in 7–15 working days.",
  },
];

// const MARKS = [
//   { src: sslBadge, alt: "SSL certified checkout" },
//   { src: mcafeeBadge, alt: "McAfee secure site" },
//   { src: awsBadge, alt: "Data secured with AWS" },
// ];

export default function TrustBanner() {
  return (
    <section
      aria-labelledby="trust-title"
      className="w-full bg-[#F2F9FD] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* ── Left: the promise ────────────────────────────── */}
          <div className="lg:pt-2">
            <p className="text-[13px] font-semibold text-[#0080C1]">
              How we operate
            </p>

            <h2
              id="trust-title"
              className="mt-3 text-[1.75rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-[#201D62] sm:text-[2.1rem]"
            >
              What happens after you order
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Buying medicine online shouldn&apos;t be a black box. Here is every
              step your parcel goes through, and exactly what we do when
              something goes wrong.
            </p>

            <p className="mt-6 text-[13.5px] font-medium text-slate-500">
              4,000+ medicines in stock &middot; Dispensing since 2019
            </p>

            {/* <Link
              href="/return-refund-policy"
              className="group mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-[#0080C1] hover:text-[#00699E]"
            >
              Read our refund policy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link> */}
          </div>

          {/* ── Right: the process ───────────────────────────── */}
          <ol className="space-y-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative pl-8">
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-[22px] bottom-[-32px] w-px bg-slate-300"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-[#0080C1] bg-white"
                />
                <h3 className="text-[15px] font-bold text-[#201D62]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Verification, demoted to a footnote ──────────── */}
        {/* <div className="mt-16 grid gap-6 border-t border-slate-300/70 pt-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
          <ul className="flex flex-wrap items-center gap-3">
            {MARKS.map((mark) => (
              <li
                key={mark.alt}
                className="flex h-11 w-[72px] items-center justify-center rounded-lg bg-white px-2.5 py-2 ring-1 ring-slate-900/[0.06]"
              >
                <Image
                  src={mark.src}
                  alt={mark.alt}
                  width={56}
                  height={28}
                  className="h-auto w-auto max-h-6 object-contain"
                />
              </li>
            ))}
          </ul>

          <p className="text-[13px] leading-relaxed text-slate-500">
            These marks belong to the vendors who certify us, not to us. Card
            details are never stored on our servers, and checkout runs over an
            SSL-encrypted connection.
          </p>
        </div> */}
      </div>
    </section>
  );
}
