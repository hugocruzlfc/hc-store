import Footer from "@/components/footer";
import HeaderSlider from "@/components/header-slider";
import { Navbar } from "@/components/navbar";
import { fetchProducts } from "@/features/products/actions/products-action";
import HomeProducts from "@/features/products/home-product";

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
