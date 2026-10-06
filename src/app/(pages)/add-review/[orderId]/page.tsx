import { fetchOrderById } from "@/features/orders/actions/order";
import ReviewOrder from "@/features/reviews/review-order";
import { Metadata } from "next";

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

  return <ReviewOrder order={order} />;
}
