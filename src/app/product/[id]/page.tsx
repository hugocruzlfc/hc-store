import { fetchProductById } from "@/features/products/actions/products-action";
import ProductDetails from "@/features/products/product-details";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
