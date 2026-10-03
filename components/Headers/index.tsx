"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeaderIcons from "./HeaderIcons";
import Searchbar from "./Searchbar";
import Image from "next/image";
import logo1 from "../../public/Home/logo.png";

export default function Index() {
  const allCategoriesItems: [string, string, string][] = [
    ["Acid reducers", "acid-reducers", "6"],
    ["Acne", "acne", "21"],
    ["Alcohol & Drug Treatment", "alcohol-drug-treatment", "7"],
    ["Allegra", "allegra", "66"],
    ["Allergy", "allergy", "4"],
    ["Alpha Blockers", "alpha-blockers", "22"],
    ["Alzheimers", "alzheimers", "23"],
    ["Angina Pectoris Anti-Anginals", "antianginals", "24"],
    ["Anthelmintic & Anti-worm", "anthelmintics", "25"],
    ["Anti Amebics", "antiamebics", "26"],
    ["Anti Cancer", "anticancer", "20"],
    ["Anti Coagulants", "anticoagulants", "27"],
    ["Anti Convulsants", "anticonvulsants", "8"],
    ["Anti Emetic", "antiemetics", "28"],
    ["Anti Migraine", "antimigraine", "9"],
    ["Anti Parkinsonian", "antiparkinsonian", "29"],
    ["Antibiotics", "antibiotics", "11"],
    ["Antifungal", "antifungal", "12"],
    ["Antiviral", "antiviral", "10"],
    ["Arthritis", "arthritis", "49"],
    ["Asthalin", "asthalin", "68"],
    ["Asthma", "asthma", "5"],
    ["Beauty & Skin Care", "beauty-skin-care", "13"],
    ["Birth Control", "birth-control", "30"],
    ["Bladder & Prostate", "bladder-prostate", "31"],
    ["Body & Mind", "body-mind", "47"],
    ["Breast Cancer", "breast-cancer", "50"],
    ["Candid", "candid", "70"],
    ["Cenforce", "cenforce", "52"],
    ["Cernos", "cernos", "57"],
    ["Chewable", "chewable", "61"],
    ["Climax Spray", "climax-spray", "39"],
    ["Diabetes", "diabetes", "14"],
    ["ED-Jelly", "ed-jelly", "58"],
    ["Eye Care", "eye-care", "3"],
    ["Eye Care Capsules", "eye-care-capsules", "43"],
    ["Eye Care Tablets", "eye-care-tablets", "44"],
    ["Eye Drops", "eye-drops", "41"],
    ["Eye Injections", "eye-injections", "45"],
    ["Eye Ointment & Gel", "eye-ointment-gel", "42"],
    ["Female Viagra", "female-viagra", "48"],
    ["Filagra", "filagra", "65"],
    ["Fildena", "fildena", "55"],
    ["Gastro Health", "gastro-health", "15"],
    ["Generic Viagra", "generic-viagra", "40"],
    ["Hair Loss", "hair-loss", "32"],
    ["Heart & Blood Pressure", "heart-blood-pressure", "16"],
    ["Herbal", "herbal", "2"],
    ["Herbal Medicines for Men's Sexual Health", "herbal-mens-sexual-health", "38"],
    ["HIV & Herpes", "hiv-herpes", "34"],
    ["Immune Booster", "immune-booster", "17"],
    ["Infertility Therapy", "infertility-therapy", "33"],
    ["Inhaler", "inhaler", "60"],
    ["Joint pain", "joint-pain", "56"],
    ["Kamagra", "kamagra", "59"],
    ["Levitra", "levitra", "62"],
    ["Malegra", "malegra", "64"],
    ["Men's Health", "mens-health", "1"],
    ["Obesity", "obesity", "51"],
    ["Osteoporosis", "osteoporosis", "46"],
    ["Pain Relief", "pain-relief", "18"],
    ["Sildenafil - Blue Pill", "sildenafil", "35"],
    ["Suhagra", "suhagra", "63"],
    ["Tadalafil", "tadalafil", "36"],
    ["Tadarise", "tadarise", "54"],
    ["Vardenafil", "vardenafil", "37"],
    ["Vidalista", "vidalista", "53"],
    ["Vigora", "vigora", "69"],
    ["Women's Health", "womens-health", "19"],
    ["Zenegra", "zenegra", "67"],
  ];

  return (
    <>
      {/* <TopHeader /> */}

      {/* Main Header - Sales-Oriented Design */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="w-full">
          {/* Top Row: Logo + Search + Icons + CTA */}
          <div className="my-1">
            <div className="max-w-[1400px] md:mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between gap-3 ">

                {/* Logo Section */}
                <Link href="/" className="shrink-0 group">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                      width={300}
                      height={100}
                      alt="ParasiteHeal - Your Trusted Online Pharmacy"
                      src={logo1}
                      className="h-10 sm:h-12 lg:h-16 w-auto transition-all duration-300 group-hover:scale-105 filter drop-shadow-xl p-1 sm:p-2"
                      priority
                    />
                    <div className="hidden md:flex flex-col">
                      <span className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wide">Trusted Worldwide</span>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                <NavDropdown
                  label="Categories"
                  items={allCategoriesItems}
                />

                {/* Enhanced Search Bar */}
                <div className="hidden md:flex items-center flex-1 max-w-3xl mx-4 ">
                  <div className="w-full group">
                    <Searchbar />
                  </div>
                </div>

                {/* Trust Badges & Icons */}
                <div className="flex gap-1 sm:gap-2 items-center">
                  <HeaderIcons />
                </div>
              </div>

              {/* Mobile Search Bar */}
              <div className="md:hidden pb-3">
                <Searchbar />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


type NavDropdownProps = {
  label: string;
  items: string[] | [string, string, string][];
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Close when clicking/tapping outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setFocusedIndex(-1);
    }
  };

  return (
    <div
      className="relative group inline-flex justify-center"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`flex items-center gap-1 cursor-pointer select-none transition-all duration-200 py-2 px-3 rounded-md border border-transparent ${isOpen
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:text-blue-600 hover:bg-slate-50 group-hover:bg-blue-50 group-hover:text-blue-700"
          }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${label} menu`}
      >
        <span className="font-bold text-[15px]">{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 text-gray-700 ${isOpen ? "rotate-180 text-blue-600" : "group-hover:rotate-180 group-hover:text-blue-600"
            }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Invisible bridge for hover stability */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-2 bg-transparent"></div>

      {/* Dropdown Menu - Strictly forced to center */}
      <div
        className={`absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-72 bg-white border border-gray-100 rounded-xl shadow-xl ring-1 ring-black/5 transform transition-all duration-200 origin-top z-50 ${isOpen
          ? "opacity-100 scale-100 visible pointer-events-auto"
          : "opacity-0 scale-95 invisible pointer-events-none md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:visible md:group-hover:pointer-events-auto"
          }`}
        role="menu"
        aria-label={`${label} submenu`}
      >
        <div className="py-2 px-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 border-b border-gray-50 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
          </div>

          <ul className="space-y-0.5" role="none">
            {items.map((item, index) => {
              const [labelText, slug] = Array.isArray(item)
                ? item
                : [capitalize(item), item];
              const isFocused = focusedIndex === index;
              return (
                <li key={slug} role="none">
                  <Link
                    href={`/categories/${slug}`}
                    className={`group flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all duration-150 ${isFocused
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    role="menuitem"
                    tabIndex={isOpen ? 0 : -1}
                    onFocus={() => setFocusedIndex(index)}
                    onClick={() => {
                      setIsOpen(false);
                      setFocusedIndex(-1);
                    }}
                  >
                    <span className="font-semibold">{labelText}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
