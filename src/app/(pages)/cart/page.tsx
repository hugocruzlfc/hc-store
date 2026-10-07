import { fetchAddresses } from "@/features/address/actions/address";
import Cart from "@/features/cart/cart";
import { Metadata } from "next";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = { title: "Cart" };

export default async function CartPage() {
  const addresses = await fetchAddresses();
  return <Cart addresses={addresses} />;
}
