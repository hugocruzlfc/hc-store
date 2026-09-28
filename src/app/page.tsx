import Footer from "@/components/footer";
import HeaderSlider from "@/components/header-slider";
import HomeProducts from "@/components/home-product";
import { Navbar } from "@/components/navbar";

export default async function page() {
  return (
    <div>
      <Navbar />
      <div>
        <HeaderSlider />
        <HomeProducts />
      </div>

      <Footer />
    </div>
  );
}
