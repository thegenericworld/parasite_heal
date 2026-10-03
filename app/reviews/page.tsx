import React from 'react';
import { Metadata } from 'next';
import { FaStar, FaRegStar } from 'react-icons/fa';
import ReviewsClientWrapper from '@/components/ReviewsClientWrapper';

export const metadata: Metadata = {
  title: 'Customer Reviews | Authentic Feedback',
  description: 'Read authentic customer reviews and ratings about our products, delivery speed, and overall service quality.',
};

interface Review {
  id: number;
  user_name: string;
  country_name: string;
  product_name: string;
  product_id: number;
  review: string;
  rating: number;
  created_at?: string;
}

interface PaginatedResponse {
  success: boolean;
  averageRating?: number;
  ratingCounts?: {
    "5_star": number;
    "4_star": number;
    "3_star": number;
    "2_star": number;
    "1_star": number;
  };
  data: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const renderStars = (rating: number) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <div key={star}>
        {star <= rating ? (
          <FaStar size={16} className="text-amber-400" />
        ) : (
          <FaRegStar size={16} className="text-gray-300" />
        )}
      </div>
    ))}
  </div>
);

async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; productName?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const limit = 10;
  const productFilter = params.productName || '';

  let reviews: Review[] = [];
  let totalReviews = 0;
  let totalPages = 1;
  let averageRating = 0;
  let ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/reviews?page=${page}&limit=${limit}`;
    if (productFilter) url += `&productName=${encodeURIComponent(productFilter)}`;

    console.log('Fetching reviews from:', url);
    const response = await fetch(url, { cache: 'no-store' });
    
    if (response.ok) {
      const data: PaginatedResponse = await response.json();
      console.log('API Response data:', data);
      
      // Extract data from response structure
      if (data?.data && Array.isArray(data.data)) {
        reviews = data.data;
        totalReviews = data?.pagination?.totalItems || data.data.length;
        totalPages = data?.pagination?.totalPages || 1;
        // Use averageRating from API or calculate as fallback
        averageRating = data?.averageRating !== undefined 
          ? data.averageRating 
          : reviews.length > 0 
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        
        // Use ratingCounts from API
        if (data?.ratingCounts) {
          ratingCounts = {
            5: data.ratingCounts["5_star"] || 0,
            4: data.ratingCounts["4_star"] || 0,
            3: data.ratingCounts["3_star"] || 0,
            2: data.ratingCounts["2_star"] || 0,
            1: data.ratingCounts["1_star"] || 0,
          };
        }
      } else {
        console.warn('Unexpected API response structure:', data);
        reviews = [];
        totalReviews = 0;
        totalPages = 1;
      }
      
      console.log('Processed data - reviews:', reviews.length, 'total:', totalReviews, 'pages:', totalPages);
    } else {
      console.error('API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      reviews = [];
      totalReviews = 0;
      totalPages = 1;
    }
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    reviews = [];
    totalReviews = 0;
    totalPages = 1;
  }

  const getRatingDistribution = () => {
    // Use ratingCounts from API directly
    return ratingCounts;
  };

  const distribution = getRatingDistribution();
  const maxCount = Math.max(...Object.values(distribution), 1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Reviews</h1>
          {/* <p className="text-gray-600">Trusted by {totalReviews.toLocaleString()} customers worldwide</p> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Left: Rating Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Rating Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <p className="text-sm text-gray-600">Based on {totalReviews} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3 border-t border-gray-200 pt-6">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-10">{rating} star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all"
                          style={{
                            width: `${maxCount > 0 ? (distribution[rating as keyof typeof distribution] / maxCount) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-6 text-right">
                        {distribution[rating as keyof typeof distribution]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <ReviewsClientWrapper totalReviews={totalReviews} productFilter={productFilter} page={page} />
              </div>
            </div>
          </div>

          {/* Right: Reviews List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <svg className="absolute left-3 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <form method="GET" className="flex gap-2">
                <input
                  type="text"
                  placeholder="Filter by product name..."
                  name="productName"
                  defaultValue={productFilter}
                  className="flex-1 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <div
                    key={review.id || idx}
                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.user_name}</h4>
                        <p className="text-sm text-gray-500">
                          {review.country_name}
                          {review.created_at && ` • ${new Date(review.created_at).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-blue-600 mb-2">{review.product_name}</p>
                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <a
                  href={`/reviews?page=${Math.max(1, page - 1)}${productFilter ? `&productName=${encodeURIComponent(productFilter)}` : ''}`}
                  className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  Previous
                </a>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNum = Math.max(1, page - 2) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <a
                      key={pageNum}
                      href={`/reviews?page=${pageNum}${productFilter ? `&productName=${encodeURIComponent(productFilter)}` : ''}`}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </a>
                  );
                })}
                <a
                  href={`/reviews?page=${Math.min(totalPages, page + 1)}${productFilter ? `&productName=${encodeURIComponent(productFilter)}` : ''}`}
                  className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${page === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  Next
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;