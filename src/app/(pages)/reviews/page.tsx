import { fetchReviewsByUserId } from "@/features/reviews/actions/review";
import ReviewsList from "@/features/reviews/reviews-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Reviews",
  description: "View and manage all your reviews",
};

export default async function ReviewsPage() {
  const reviews = await fetchReviewsByUserId();

  return <ReviewsList reviews={reviews} />;
}
