import { fetchAddresses } from "@/features/address/actions/address";
import BuyNow from "@/features/buy-now/buy-now";
import { fetchProductById } from "@/features/products/actions/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await fetchProductById(productId);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `Buy now - ${product.name}`,
    description: product.description ?? "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await fetchProductById(productId);
  const addresses = await fetchAddresses();

  if (!product) {
    notFound();
  }

  return <BuyNow product={product} addresses={addresses} />;
}
