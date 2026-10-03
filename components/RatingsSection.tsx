"use client";

import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface RatingsSectionProps {
  productId: string;
  productName: string;
}

const RatingsSection: React.FC<RatingsSectionProps> = ({ productId, productName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [username, setUsername] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    const mockReviews: Review[] = [
      {
        id: "1",
        username: "John D.",
        rating: 5,
        comment: "Excellent product! Works exactly as described. Fast delivery and great packaging.",
        date: "2025-01-15",
        verified: true,
      },
      {
        id: "2",
        username: "Sarah M.",
        rating: 4,
        comment: "Good quality medicine. Had a positive experience overall. Would recommend.",
        date: "2025-01-10",
        verified: true,
      },
      {
        id: "3",
        username: "Mike R.",
        rating: 5,
        comment: "Perfect! Exactly what I needed. Professional service and authentic product.",
        date: "2025-01-08",
        verified: false,
      },
      {
        id: "4",
        username: "Emily L.",
        rating: 4,
        comment: "Very satisfied with the purchase. Quick delivery and well-packaged.",
        date: "2025-01-05",
        verified: true,
      },
    ];

    setTimeout(() => {
      setReviews(mockReviews);
      const total = mockReviews.length;
      const sum = mockReviews.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating(total > 0 ? sum / total : 0);
      setTotalReviews(total);
      setIsLoading(false);
    }, 1000);
  }, [productId]);

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0 || !userComment.trim() || !username.trim()) {
      alert("Please fill in all fields and provide a rating.");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      username: username.trim(),
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString().split('T')[0],
      verified: false,
    };

    setReviews([newReview, ...reviews]);
    setTotalReviews(totalReviews + 1);
    
    // Update average rating
    const newSum = reviews.reduce((acc, review) => acc + review.rating, 0) + userRating;
    setAverageRating(newSum / (totalReviews + 1));

    // Reset form
    setUserRating(0);
    setUserComment("");
    setUsername("");
    setShowReviewForm(false);

    alert("Thank you for your review!");
  };

  const renderStars = (rating: number, interactive: boolean = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onStarClick ? () => onStarClick(star) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""} ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            disabled={!interactive}
          >
            {star <= rating ? <FaStar size={20} /> : <FaRegStar size={20} />}
          </button>
        ))}
      </div>
    );
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++;
      }
    });
    return distribution.reverse(); // Show 5-star first
  };

  if (isLoading) {
    return (
      <section className="mt-8 mx-4 md:mx-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 mx-4 md:mx-8">
      <h2 className="text-2xl font-bold text-slate-600 mb-4">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">
              Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {getRatingDistribution().map((count, index) => {
              const starLevel = 5 - index;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={starLevel} className="flex items-center gap-2">
                  <span className="text-sm w-2">{starLevel}</span>
                  <FaStar className="text-yellow-400" size={14} />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          {showReviewForm ? "Cancel Review" : "Write a Review"}
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {renderStars(userRating, true, handleStarClick)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder={`Share your experience with ${productName}...`}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{review.username}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RatingsSection;
