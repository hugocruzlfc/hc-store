import { fetchOrderById } from "@/features/order/actions/order";
import Order from "@/features/order/order";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> {
  const { orderId } = await params;
  const orderData = await fetchOrderById(orderId);

  if (!orderData) {
    return {
      title: "Order not found",
      description: "The requested order could not be found.",
    };
  }

  return {
    title: `Order ${orderData.id}`,
    description: `Order by user ${orderData.user_id}`,
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const orderData = await fetchOrderById(orderId);

  if (!orderData) {
    notFound();
  }

  return <Order orderData={orderData} />;
}
