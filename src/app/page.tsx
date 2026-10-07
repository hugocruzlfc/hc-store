import { fetchProducts } from "@/features/products/actions/products";
import HomeProducts from "@/features/products/home-product";
import Footer from "@/shared/components/footer";
import HeaderSlider from "@/shared/components/header-slider";

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
