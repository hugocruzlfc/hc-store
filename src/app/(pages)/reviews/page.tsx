import { fetchReviewsByUserId } from "@/features/reviews/actions/review";
import ReviewsList from "@/features/reviews/reviews-list";
import { Metadata } from "next";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "My Reviews",
  description: "View and manage all your reviews",
};

export default async function ReviewsPage() {
  const reviews = await fetchReviewsByUserId();

  return <ReviewsList reviews={reviews} />;
}
