"use client";

import {
  deleteReview,
  type ReviewRecord,
} from "@/features/reviews/actions/review";
import ReviewCard from "@/features/reviews/review-card";
import ReviewDetail from "@/features/reviews/review-detail";
import { useMemo, useState } from "react";

interface ReviewsListProps {
  reviews: ReviewRecord[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const [reviewList, setReviewList] = useState(() => reviews);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(
    reviews[0]?.id ?? null,
  );
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const selectedReview = useMemo(
    () =>
      reviewList.find((review) => review.id === selectedReviewId) ??
      reviewList[0] ??
      null,
    [reviewList, selectedReviewId],
  );

  const handleDelete = async (reviewId: string) => {
    setDeletingReviewId(reviewId);
    const isDeleted = await deleteReview(reviewId);

    if (isDeleted) {
      setReviewList((current) => {
        const nextReviews = current.filter((review) => review.id !== reviewId);
        setSelectedReviewId((currentSelection) =>
          currentSelection === reviewId
            ? (nextReviews[0]?.id ?? null)
            : currentSelection,
        );
        return nextReviews;
      });
    }

    setDeletingReviewId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase">
                Account
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-slate-900">
                My Reviews
              </h1>
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
            {reviewList.length} review{reviewList.length === 1 ? "" : "s"}
          </span>
        </div>

        {reviewList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              No reviews yet
            </h2>
            <p className="mt-2 text-slate-600">
              Your purchases will appear here once you publish a review.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.52fr]">
            <aside className="space-y-4">
              {reviewList.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isSelected={review.id === selectedReviewId}
                  onSelect={setSelectedReviewId}
                />
              ))}
            </aside>

            <ReviewDetail
              review={selectedReview}
              deleting={deletingReviewId !== null}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
