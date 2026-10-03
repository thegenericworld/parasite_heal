import React from 'react';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';

interface Review {
  id: number;
  user_name: string;
  country_name: string;
  product_name: string;
  review: string;
  rating: number;
  created_at?: string;
}

interface ApiResponse {
  success: boolean;
  data: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default async function FeaturedReviews() {
  let reviews: Review[] = [];

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews?page=1&limit=3`;
    const response = await fetch(url, { cache: 'no-store' });

    if (response.ok) {
      const data: ApiResponse = await response.json();
      reviews = data?.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch featured reviews:', error);
  }

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          size={16}
          className={i < rating ? 'text-amber-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden py-20 px-4 md:px-8 z-2"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
            Real reviews from real patients who saved money and got quality medication
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1"
            >
              {/* Stars */}
              <div>{renderStars(review.rating)}</div>

              {/* Review Text */}
              <p className="text-gray-700 text-[15px] leading-relaxed flex-1">
                &ldquo;{review.review}&rdquo;
              </p>

              {/* Product */}
              <p className="text-blue-600 text-sm font-semibold">{review.product_name}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                  >
                    {review.user_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{review.user_name}</p>
                    <p className="text-gray-500 text-xs">{review.country_name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Reviews
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
