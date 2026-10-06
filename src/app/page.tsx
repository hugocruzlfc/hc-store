import { fetchProducts } from "@/features/products/actions/products";
import HomeProducts from "@/features/products/home-product";
import Footer from "@/shared/components/footer";
import HeaderSlider from "@/shared/components/header-slider";
import { Navbar } from "@/shared/components/navbar";

export default async function HomePage() {
  const allProducts = await fetchProducts();
  return (
    <div>
      <Navbar />
      <div>
        <HeaderSlider />
        <HomeProducts products={allProducts} />
      </div>

      <Footer />
    </div>
  );
}
