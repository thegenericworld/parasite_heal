"use client";

import { useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";

interface Props {
  currentPage: number;
  totalPages: number;
  query?: string;
  categorySlug?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
  categorySlug,
}: Props) {
  const router = useRouter();
  const { setIsLoading } = useNavigation();

  const goToPage = (page: number) => {
    setIsLoading(true);
    const params = new URLSearchParams();

    if (categorySlug) {
      if (page === 1) router.push(`/categories/${categorySlug}`);
      else router.push(`/categories/${categorySlug}/page/${page}`);
      return;
    }
    if (query) {
      params.set("query", query);
      params.set("page", page.toString());
      router.push(`/medicines/search?${params.toString()}`);
      return;
    }
    if (page === 1) router.push(`/medicines`);
    else router.push(`/medicines/page/${page}`);
  };

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push(-1); // ellipsis

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push(-1); // ellipsis
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {generatePages().map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-3 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`px-3 py-2 rounded cursor-pointer ${
              currentPage === page
                ? "bg-gradient-to-br from-sky-400 to-blue-500 hover:from-sky-400 hover:to-blue-900 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
