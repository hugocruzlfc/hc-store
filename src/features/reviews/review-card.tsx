import { assets } from "@/assets";
import type { ReviewRecord } from "@/features/reviews/actions/review";
import Image from "next/image";

interface ReviewCardProps {
  review: ReviewRecord;
  isSelected: boolean;
  onSelect: (reviewId: string) => void;
}

export default function ReviewCard({
  review,
  isSelected,
  onSelect,
}: ReviewCardProps) {
  const rating = Math.max(0, Math.min(5, Number(review.product_rating ?? 0)));
  const productImage = review.product_image_url;

  return (
    <button
      type="button"
      onClick={() => onSelect(review.id)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-[#043033] bg-[#f4fbfb] shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-xl bg-gray-100">
          {productImage ? (
            <Image
              src={productImage}
              alt={review.product_name ?? "Review product"}
              width={80}
              height={80}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-medium text-gray-500">
              IMG
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-base font-medium text-gray-800">
              {review.review_title || "Untitled review"}
            </p>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium tracking-wide text-gray-600 uppercase">
              {review.product_rating ?? 0}/5
            </span>
          </div>

          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const active = index < rating;
              return (
                <Image
                  key={`${review.id}-star-${index}`}
                  src={active ? assets.star_icon : assets.star_dull_icon}
                  alt={active ? "filled star" : "empty star"}
                  width={12}
                  height={12}
                />
              );
            })}
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {review.review_description || "No description provided."}
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
            <span>{review.product_name || "Product"}</span>
            <span>
              {review.created_at
                ? new Date(review.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recently"}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
