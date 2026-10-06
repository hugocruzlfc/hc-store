import { fetchUserOrders } from "@/features/orders/actions/order";
import Orders from "@/features/orders/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Orders",
  description: "View your orders",
};

export default async function OrdersPage() {
  const orders = await fetchUserOrders();
  return <Orders orders={orders} />;
}
