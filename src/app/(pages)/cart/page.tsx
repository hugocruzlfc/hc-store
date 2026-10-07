import { fetchAddresses } from "@/features/address/actions/address";
import Cart from "@/features/cart/cart";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Cart" };

export default async function CartPage() {
  const addresses = await fetchAddresses();
  return <Cart addresses={addresses} />;
}
