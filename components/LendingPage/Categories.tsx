"use client";

import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";

import img1 from "../../public/Home/Shop/1.jpg";
import img2 from "../../public/Home/Shop/2.jpg";
import img3 from "../../public/Home/Shop/3.jpg";
import img4 from "../../public/Home/Shop/4.jpg";
import img5 from "../../public/Home/Shop/5.jpg";
import img6 from "../../public/Home/Shop/6.jpg";

type Category = {
  name: string;
  image: StaticImageData;
  route: string;
};

const ShopByCategory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const data: Category[] = [
     {
      name: "Diabetes",
      image: img5,
      route: "/categories/diabetes",
    },
    {
      name: "Beauty & Skin Care",
      image: img1,
      route: "/categories/beauty-skin-care",
    },
    {
      name: "Pain Relief",
      image: img2,
      route: "/categories/pain-relief",
    },
    {
      name: "Asthma",
      image: img3,
      route: "/categories/asthma",
    },
    {
      name: "Hair Loss",
      image: img4,
      route: "/categories/hair-loss",
    },
    {
      name: "Eye Care",
      image: img6,
      route: "/categories/eye-care",
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => scrollElement.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <section className="max-w-7xl m-auto py-8 px-4 sm:px-6">

      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Find Products by Condition
          </h2>
        </div>
      </div>

      <div className="relative group">
        {/* Navigation Arrows - Hidden on mobile */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 hover:bg-gray-50 transition-all duration-300 -translate-x-5 group-hover:translate-x-0"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 hover:bg-gray-50 transition-all duration-300 translate-x-5 group-hover:translate-x-0"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden hide-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-3 sm:gap-4 pb-2">
            {data.map((d, id) => (
              <div
                key={id}
                className="shrink-0 w-40 sm:w-44 md:w-48"
                onMouseEnter={() => setActiveIndex(id)}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={() => setActiveIndex(id)}
              >
                <Link href={d.route} className="block">
                  <div
                    className={`bg-white h-64 sm:h-72 rounded-xl border overflow-hidden transition-all duration-300 ${
                      activeIndex === id
                        ? "shadow-2xl scale-105 border-sky-400 ring-2 ring-sky-200"
                        : "border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="h-[65%] overflow-hidden relative group/image">
                      <Image
                        src={d.image}
                        alt={`${d.name} - Buy Online`}
                        width={200}
                        height={200}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          activeIndex === id ? "scale-110" : "scale-100"
                        }`}
                        loading="lazy"
                      />
                      {/* Subtle overlay on hover */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                          activeIndex === id ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>

                    <div className="p-3 sm:p-4 flex items-center justify-center h-[35%] relative">
                      <p className="text-center text-sm sm:text-base font-bold text-slate-800 leading-tight">
                        {d.name}
                      </p>

                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-sky-200 to-blue-800 transition-all duration-300 ${
                          activeIndex === id ? "w-full" : "w-0"
                        }`}
                      />
                    </div>

                    <div
                      className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md transition-all duration-300 ${
                        activeIndex === id
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-4 md:hidden">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-blue-600" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ShopByCategory;
