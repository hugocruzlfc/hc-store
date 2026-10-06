"use client";

import { ProductParams } from "@/shared/types";
import ProductCard from "./product-card";

interface HomeProductsParams {
  products: ProductParams[];
}

export default function HomeProduct({ products }: HomeProductsParams) {
  return (
    <div className="flex flex-col items-center pt-14">
      <p className="w-full text-left text-2xl font-medium">Popular products</p>

      <div className="lg: mt-6 grid w-full max-w-375 grid-cols-2 gap-3 pb-14 max-md:gap-1.5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {products.map((product, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {/* <button className="px-12 py-2.5 mb-4 border rounded bg-[#043033] text-white hover:bg-black transition">
        See more
      </button> */}
    </div>
  );
}
