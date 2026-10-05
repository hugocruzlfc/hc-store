import BuyNow from "@/features/buy-now/buy-now";
import { fetchProductById } from "@/features/products/actions/products";
import { fetchAddresses } from "@/shared/actions/address";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await fetchProductById(productId);
  console.log(product);
  return {
    title: `Buy now - ${product.name}`,
    description: product.description,
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

  return <BuyNow product={product} addresses={addresses} />;
}
