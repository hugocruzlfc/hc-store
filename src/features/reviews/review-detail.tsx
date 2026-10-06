import { assets } from "@/assets";
import type { ReviewRecord } from "@/features/reviews/actions/review";
import Image from "next/image";

interface ReviewDetailProps {
  review: ReviewRecord | null;
  deleting: boolean;
  onDelete: (reviewId: string) => void;
}

export default function ReviewDetail({
  review,
  deleting,
  onDelete,
}: ReviewDetailProps) {
  if (!review) {
    return (
      <div className="flex min-h-105 items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
        No review selected yet.
      </div>
    );
  }

  const rating = Math.max(0, Math.min(5, Number(review.product_rating ?? 0)));
  const deliveryRating = Math.max(
    0,
    Math.min(5, Number(review.delivery_rating ?? 0)),
  );

  const imageUrls = review.review_images ?? [];

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-[#043033] uppercase">
              Review details
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">
              {review.review_title || "Untitled review"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onDelete(review.id)}
            disabled={deleting}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="grid gap-3 border-b border-gray-200 bg-gray-50 p-5 md:grid-cols-3">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className="relative h-36 overflow-hidden rounded-2xl bg-gray-100"
            >
              <Image
                src={imageUrl}
                alt={`${review.product_name || "Review product"} image ${index + 1}`}
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-6 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="rounded-full bg-[#043033]/5 px-3 py-1 font-medium text-[#043033]">
            {review.product_name || "Product"}
          </span>
          <span>
            Ordered {review.the_quantity ?? 1} item
            {(review.the_quantity ?? 1) > 1 ? "s" : ""}
          </span>
          <span>{review.amount_paid ? `$${review.amount_paid}` : "Paid"}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Product rating</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Image
                    key={`product-${index}`}
                    src={
                      index < rating ? assets.star_icon : assets.star_dull_icon
                    }
                    alt={index < rating ? "filled star" : "empty star"}
                    width={16}
                    height={16}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {rating}/5
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Delivery rating</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Image
                    key={`delivery-${index}`}
                    src={
                      index < deliveryRating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt={index < deliveryRating ? "filled star" : "empty star"}
                    width={16}
                    height={16}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {deliveryRating}/5
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="mt-2 text-base leading-7 whitespace-pre-wrap text-gray-700">
            {review.review_description ||
              "No description provided for this review."}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
          <p>
            Published:{" "}
            {review.created_at
              ? new Date(review.created_at).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Recently"}
          </p>
        </div>
      </div>
    </div>
  );
}
