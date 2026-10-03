// import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-green-950 text-gray-300">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-12">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(2 44 34)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">ParasiteHeal</h2>
              <div className="h-1 w-16 bg-linear-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted source for affordable, Chemist-approved generic medications. Quality healthcare accessible to everyone, worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "Frequently Asked Questions" },
                { href: "/how-to-order-medicines", label: "How To Order" },
                { href: "/blog", label: "Health Blog" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Policies</h3>
            <ul className="space-y-3">
              {[
                { href: "/terms-and-conditions", label: "Terms & Conditions" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/return-refund-policy", label: "Return & Refund" },
                { href: "/drug-policy", label: "Drug Policy" },
                { href: "/cancellation-policy", label: "Cancellation Policy" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Get In Touch</h3>
            <div className="space-y-4">
              {/* <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Call Us</p>
                  <a href="tel:+12123846742" className="text-gray-300 hover:text-blue-400 transition-colors text-sm block">
                    +1 (212) 394-6942
                  </a>
                </div>
              </div> */}

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Us</p>
                  <a href="mailto:ParasiteHeal@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors text-sm break-all">
                    ParasiteHeal@gmail.com
                  </a>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-center gap-2 pt-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10zm0-7a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span className="text-gray-400 text-sm">Mumbai, India</span>
              </div>

              {/* <div className="pt-4">
                <Link
                  href="//www.dmca.com/Protection/Status.aspx?ID=dc244e34-90da-4fe4-b1d7-fcfbd2d7e932"
                  title="DMCA.com Protection Status"
                  className="dmca-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="https://images.dmca.com/Badges/dmca-badge-w250-2x1-02.png?ID=dc244e34-90da-4fe4-b1d7-fcfbd2d7e932"
                    alt="DMCA.com Protection Status"
                    width={125}
                    height={50}
                  />
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex items-start gap-4">
        
            <div>
              <h4 className="text-white font-semibold mb-2">Medical Disclaimer</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                The information provided on this website is for informational purposes only and is not intended as a substitute for advice from your physician or other healthcare professional.
                Always consult with a qualified healthcare provider before starting any new medication or treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-white font-semibold">ParasiteHeal.com</span> - All Rights Reserved
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-gray-400 text-sm">Secure & Trusted Online Pharmacy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;