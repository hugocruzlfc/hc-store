import { fetchUserOrders } from "@/features/orders/actions/order";
import Orders from "@/features/orders/orders";
import { Metadata } from "next";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Users Orders",
  description: "View your orders",
};

export default async function OrdersPage() {
  const orders = await fetchUserOrders();
  return <Orders orders={orders} />;
}
