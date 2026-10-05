"use client";

import { assets } from "@/assets";
import { Navbar } from "@/components/navbar";
import { env } from "@/lib/env/client";
import { ProductParams } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductDetailsProps {
  product: ProductParams;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const handleAddToCart = () => {
    // const addItem = cartStore.getState().addItem;
    // addItem(product);
    toast.success("Check Cart");
  };
  return (
    <>
      <Navbar />
      <div className="space-y-10 px-6 pt-14 max-md:mt-4 max-md:p-0 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="mb-4 overflow-hidden rounded-lg bg-gray-500/10">
              <Image
                src={product.image_url_array[0]}
                alt="alt"
                className="h-auto w-full object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4 text-3xl font-medium text-gray-800/90">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className="mt-3 text-gray-600">{product.description}</p>
            <p className="mt-6 text-3xl font-medium">
              {env.NEXT_PUBLIC_CURRENCY}
              {product?.price}
              <span className="ml-2 text-base font-normal text-gray-800/60 line-through">
                {env.NEXT_PUBLIC_CURRENCY}
                {product?.offer_price}
              </span>
            </p>
            <hr className="my-6 bg-gray-600" />
            <div className="overflow-x-auto">
              <table className="w-full max-w-72 table-auto border-collapse">
                <tbody>
                  <tr>
                    <td className="font-medium text-gray-600">Brand</td>
                    <td className="text-gray-800/50">{product.brand}</td>
                  </tr>
                  {product?.colors && (
                    <tr>
                      <td className="font-medium text-gray-600">Colors</td>
                      <td className="text-gray-800/50">
                        {product.colors.map((each) => `${each} `)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="font-medium text-gray-600">Category</td>
                    <td className="text-gray-800/50">
                      {product.category.name}
                    </td>
                  </tr>
                </tbody>
              </table>
              {product.product_comment && (
                <div className="mt-4">
                  <p className="text-black">{product.product_comment}</p>
                </div>
              )}

              <div className="mt-2">
                {product.sizes?.map((each, index) => (
                  <button
                    className={`mr-1 rounded-lg px-2 py-1 text-sm`}
                    key={index}
                  >
                    {each}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full border border-[#043033] py-3.5 text-gray-800/80 transition hover:bg-gray-200"
              >
                Add to Cart
              </button>

              <Link
                href={`/buy-now/${product.id}`}
                className="w-full bg-[#043033] py-3.5 text-white transition hover:bg-black"
              >
                <button className="w-full">Buy now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* extra imges */}
      {product.image_url_array.length > 1 &&
        product.image_url_array.length > 0 && (
          <div className="mt-8 flex w-full justify-center">
            <div className="flex w-full max-w-250 flex-col gap-4 md:flex-row md:flex-wrap">
              {product.image_url_array.map((eachImage, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 md:w-[calc(33.333%-1rem)]"
                >
                  <Image
                    src={eachImage}
                    alt={`Product extra image ${index}`}
                    className="h-auto w-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
