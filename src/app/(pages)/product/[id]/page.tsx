import { fetchProductById } from "@/features/products/actions/products";
import ProductDetails from "@/features/products/product-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description ?? "",
  };
}

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
