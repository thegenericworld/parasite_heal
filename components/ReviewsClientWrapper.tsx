'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface ReviewsClientWrapperProps {
  totalReviews: number;
  productFilter: string;
  page: number;
}

export default function ReviewsClientWrapper({}: ReviewsClientWrapperProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  const [formData, setFormData] = useState({
    user_name: '',
    country_name: '',
    product_name: '',
    product_id: 1,
    review: '',
    rating: 0,
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.user_name ||
      !formData.country_name ||
      !formData.product_name ||
      formData.rating === 0 ||
      !formData.review
    ) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          user_name: '',
          country_name: '',
          product_name: '',
          product_id: 1,
          review: '',
          rating: 0,
        });
        setShowForm(false);
        alert('Thank you for your review!');
        router.refresh();
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rate: number) => void) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : 'button'}
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          className={`transition-all ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
        >
          {star <= rating ? (
            <FaStar size={20} className="text-amber-400" />
          ) : (
            <FaRegStar size={20} className="text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full mt-6 px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        {showForm ? 'Cancel' : 'Share Your Review'}
      </button>

      {showForm && mounted && createPortal(
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          style={{ zIndex: 999999 }}
        >
          <form
            onSubmit={handleSubmitReview}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Write Your Review</h3>

            <div className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Your Rating *
                </label>
                <div className="flex gap-1">
                  {renderStars(formData.rating, true, (rate) =>
                    setFormData({ ...formData, rating: rate })
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.user_name}
                  onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country_name}
                  onChange={(e) => setFormData({ ...formData, country_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="USA"
                />
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.product_name}
                  onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Aspirin"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Review *
                </label>
                <textarea
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Share your experience with this product..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Posting...' : 'Post Review'}
                </button>
              </div>
            </div>
          </form>
        </div>,
        document.body
      )}
    </>
  );
}
