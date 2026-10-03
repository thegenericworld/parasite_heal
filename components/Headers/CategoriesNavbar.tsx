"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react"; // Optional: Use if you have lucide, else keep SVG

const CategoriesNavBar = () => {
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
    <nav className="flex-1 hidden md:block" aria-label="Categories navigation">
      {/* Added relative here to ensure z-index context works correctly */}
      <div className="flex flex-wrap gap-2 lg:gap-6 items-center text-sm font-medium ml-4 lg:ml-8">
        
        {/* ----- All Categories ----- */}
        <NavDropdown
          label="All Categories"
          items={allCategoriesItems}
        />
       
        {/* ----- 2. Infectious Diseases ----- */}
        <NavDropdown
          label="Infectious Diseases"
          items={[
            ["Antibiotics", "antibiotics", "0"],
            ["Anti Fungal", "antifungal", "92"],
            ["Anti Viral", "antiviral", "0"],
            ["HIV & Herpes", "hiv-herpes", "95"],
            ["Anti-Amebics", "antiamebics", "0"],
            ["Immune Booster", "immune-booster", "0"],
          ]}
        />

        {/* ----- 3. Chronic Conditions ----- */}
        <NavDropdown
          label="Chronic Conditions"
          items={[
            ["Diabetes", "diabetes", "0"],
            ["Heart & Blood Pressure", "heart-blood-pressure", "0"],
            ["Asthma", "asthma", "15"],
            ["Allergy", "allergy", "13"],
            ["Acid Reducers", "acid-reducers", "0"],
            ["Gastro Health", "gastro-health", "0"],
            ["Arthritis", "arthritis", "0"],
          ]}
        />

        {/* ----- 5. Eye, Skin & Wellness ----- */}
        <NavDropdown
          label="Eye, Skin & Wellness"
          items={[
            ["Eye Care", "eye-care", "90"],
            ["Eye Drops", "eye-drops", "145"],
            ["Eye Ointments & Gels", "eye-ointment-gel", "0"],
            // ["Eye Care Capsules", "eye-care-capsules", "0"],
            // ["Eye Care Tablets", "eye-care-tablets", "0"],
            ["Eye Injections", "eye-injections", "0"],
            ["Acne", "acne", "3"],
            ["Hair Loss", "hair-loss", "4"],
            ["Beauty & Skin Care", "beauty-skin-care", "0"],
            ["Herbal Products", "herbal", "0"],
          ]}
        />

         {/* ----- 1. Sexual Health ----- */}
        <NavDropdown
          label="Sexual Health"
          items={[
            ["Men's Health", "mens-health", "7"],
            ["Women's Health", "womens-health", "7"],
            ["Sildenafil (Viagra)", "sildenafil", "14"],
            ["Tadalafil (Cialis)", "tadalafil", "35"],
            ["Vardenafil (Levitra)", "vardenafil", "40"],
            // ["Cenforce", "cenforce", "0"],
            // ["Vidalista", "vidalista", "0"],
            // ["Fildena", "fildena", "36"],
            ["Female Viagra", "female-viagra", "0"],
            ["Birth Control", "birth-control", "0"],
            ["Infertility Therapy", "infertility-therapy", "48"],
          ]}
        />

      </div>
    </nav>
  );
};

type NavDropdownProps = {
  label: string;
  items: string[] | [string, string, string][];
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setFocusedIndex(-1);
    }
  };

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setIsOpen(false)} // UX: Close when mouse leaves the entire widget
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        className={`flex items-center gap-1 cursor-pointer select-none transition-all duration-200 py-2 px-3 rounded-md border border-transparent ${
            isOpen ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-600 hover:bg-slate-50"
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
          className={`transition-transform duration-300 text-gray-400 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

      <div
        className={`absolute top-[calc(100%+0.5rem)] left-0 w-72 bg-white border border-gray-100 rounded-xl shadow-xl ring-1 ring-black/5 transform transition-all duration-200 origin-top-left z-50 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible pointer-events-none"
        }`}
        role="menu"
        aria-label={`${label} submenu`}
      >
        <div className="py-2 px-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Header inside dropdown (Optional, good for context) */}
          <div className="px-4 py-2 border-b border-gray-50 mb-1">
             <span className="text-xs font-semibold text-gray-00 uppercase tracking-wider">{label}</span>
          </div>

          <ul className="space-y-0.5" role="none">
            {items.map((item, index) => {
              const [labelText, slug ] = Array.isArray(item)
                ? item
                : [capitalize(item), item, "0"];
              const isFocused = focusedIndex === index;
              return (
                <li key={slug} role="none">
                  <Link
                    href={`/categories/${slug}`}
                    className={`group flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all duration-150 ${
                      isFocused
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
                    
                    {/* Count Badge */}
                    {/* {count !== "0" && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            isFocused 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}>
                            {count}
                        </span>
                    )} */}
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

export default CategoriesNavBar;