// products/search/query="x"&page=1
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX, FiLoader } from "react-icons/fi";
import { useNavigation } from "@/contexts/NavigationContext";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

type Product = {
  slug: string;
  name: string;
  generic_name?: string;
  usa_brand_name?: string;
  price_per_unit?: string;
  unit_label?: string;
};

export default function Searchbar() {
  const router = useRouter();
  const { setIsLoading } = useNavigation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // State
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle closing dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch logic with Debounce and AbortController
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        setIsSuggestionsLoading(false);
        return;
      }

      setIsSuggestionsLoading(true);

      try {
        const res = await fetch(
          `${BASE_API_URL}/products/searchSuggestions?query=${encodeURIComponent(query)}`,
          { signal }
        );

        if (res.ok) {
          const data: Product[] = await res.json();
          setSuggestions(data);
          setShowDropdown(true);
          setActiveIndex(-1);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Failed to fetch suggestions", err);
        }
      } finally {
        setIsSuggestionsLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  const goToSearchPage = useCallback(
    (searchValue: string) => {
      if (!searchValue.trim()) return;

      setIsLoading(true);
      setShowDropdown(false);
      inputRef.current?.blur();
      const queryParams = new URLSearchParams();
      queryParams.set("query", searchValue.trim());
      queryParams.set("page", "1");
      router.push(`/medicines/search?${queryParams.toString()}`);
    },
    [router, setIsLoading]
  );

  const goToProductPage = useCallback(
    (product: Product) => {
      setIsLoading(true);
      setQuery(product.name);
      setShowDropdown(false);
      inputRef.current?.blur();
      router.push(`/medicines/${product.slug}`);
    },
    [router, setIsLoading]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown || suggestions.length === 0) {
        if (e.key === "Enter") goToSearchPage(query);
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && suggestions[activeIndex]) {
            goToProductPage(suggestions[activeIndex]);
          } else {
            goToSearchPage(query);
          }
          break;
        case "Escape":
          setShowDropdown(false);
          inputRef.current?.blur();
          break;
      }
    },
    [showDropdown, suggestions, activeIndex, query, goToSearchPage, goToProductPage]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (suggestions.length > 0) setShowDropdown(true);
  }, [suggestions.length]);

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full md:w-[80%]" ref={wrapperRef}>
      {/* Search Input Container */}
      <div
        className={`relative flex items-center mx-2 md:mx-4 transition-all duration-200 ${
          isFocused ? "scale-[1.01]" : ""
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isSuggestionsLoading ? (
            <FiLoader className="text-blue-500 text-lg animate-spin" />
          ) : (
            <FiSearch
              className={`text-lg transition-colors duration-200 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
          )}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          aria-controls="search-results"
          // aria-expanded={showDropdown}
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${suggestions[activeIndex]?.slug}` : undefined
          }
          placeholder="Search medicines, generics, brands..."
          className={`w-full pl-11 pr-28 md:pr-32 py-3 md:py-3.5 rounded-4xl bg-white border-2 font-medium text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-200 text-base md:text-base ${
            isFocused
              ? "border-blue-400 shadow-lg shadow-blue-400/20"
              : "border-gray-400 hover:border-gray-500"
          }`}
          aria-label="Search medicines"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-24 md:right-28 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
            aria-label="Clear search"
          >
            <FiX className="text-sm" />
          </button>
        )}

        {/* Search Button */}
        <button
          type="button"
          onClick={() => goToSearchPage(query)}
          disabled={!query.trim()}
          className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 flex items-center justify-center gap-1.5 px-3 md:px-5 py-2 md:py-2.5 text-white font-semibold rounded-full transition-all duration-200 bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg shadow-green-900/20 hover:shadow-xl cursor-pointer disabled:opacity-60
          }`}
          aria-label="Search"
        >
          <span className="text-sm md:text-sm">Search</span>
        </button>
      </div>

      {/* Dropdown List */}
      {showDropdown && suggestions.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute z-50 bg-white border border-gray-200 w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-h-[60vh] md:max-h-[450px] overflow-y-auto shadow-2xl rounded-2xl mt-2 mx-2 md:mx-4 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Results count header */}
          <li className="px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium sticky top-0">
            {suggestions.length} result{suggestions.length !== 1 ? "s" : ""} found
          </li>

          {suggestions.map((product, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={product.slug}
                id={`suggestion-${product.slug}`}
                role="option"
                aria-selected={isActive}
                className={`group px-4 py-3 cursor-pointer transition-all duration-150 flex justify-between items-center gap-3 ${
                  isActive
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : "hover:bg-gray-50 border-l-4 border-l-transparent"
                }`}
                onClick={() => goToProductPage(product)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Left Side: Name and Badges */}
                <div className="flex flex-col gap-0.5 text-left flex-1 min-w-0">
                  <span
                    className={`font-semibold text-sm md:text-base truncate transition-colors ${
                      isActive ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {highlightMatch(product.name, query)}
                  </span>

                  <div className="flex flex-wrap gap-1.5 items-center">
                    {product.usa_brand_name && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {highlightMatch(product.usa_brand_name, query)}
                      </span>
                    )}
                    {product.generic_name && (
                      <span className="text-xs text-gray-500 truncate">
                        {highlightMatch(product.generic_name, query)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side: Price and Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  {product.price_per_unit && (
                    <div className="text-right">
                      <span
                        className={`text-sm font-bold whitespace-nowrap ${
                          isActive ? "text-blue-700" : "text-gray-900"
                        }`}
                      >
                        ${product.price_per_unit}
                      </span>
                      <span className="text-xs text-gray-400 block">{product.unit_label}</span>
                    </div>
                  )}

                  <svg
                    className={`h-5 w-5 shrink-0 transition-all duration-200 ${
                      isActive
                        ? "text-blue-500 translate-x-1"
                        : "text-gray-300 group-hover:text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </li>
            );
          })}

          {/* View all results footer */}
          <li
            className="px-4 py-3 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors sticky bottom-0"
            onClick={() => goToSearchPage(query)}
          >
            <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all results for &quot;{query}&quot; →
            </span>
          </li>
        </ul>
      )}

      {/* No results message */}
      {showDropdown && query.trim() && suggestions.length === 0 && !isSuggestionsLoading && (
        <div className="absolute z-50 bg-white border border-gray-200 w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] shadow-xl rounded-2xl mt-2 mx-2 md:mx-4 p-6 text-center">
          <div className="text-gray-400 mb-2">
            <FiSearch className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-gray-600 font-medium">No medicines found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
}
