import { fetchOrderById } from "@/features/orders/actions/order";
import ReviewOrder from "@/features/reviews/review-order";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> {
  const { orderId } = await params;
  const order = await fetchOrderById(orderId);

  if (!order) {
    return {
      title: "Order not found",
      description: "The requested order could not be found.",
    };
  }

  return {
    title: `Review for ${order.id}`,
    description: `Review for order by user ${order.user_id}`,
  };
}

export default async function AddReviewPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await fetchOrderById(orderId);

  if (!order) {
    notFound();
  }

  return <ReviewOrder order={order} />;
}
