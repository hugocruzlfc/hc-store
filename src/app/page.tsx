import { fetchProducts } from "@/features/products/actions/products";
import HomeProducts from "@/features/products/home-product";
import Footer from "@/shared/components/footer";
import HeaderSlider from "@/shared/components/header-slider";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function HomePage() {
  const allProducts = await fetchProducts();
  return (
    <>
      <HeaderSlider />
      <HomeProducts products={allProducts} />
      <Footer />
    </>
  );
}
