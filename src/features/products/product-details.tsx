"use client";

import { assets } from "@/assets";
import { env } from "@/lib/env/client";
import { ProductParams } from "@/shared/types";
import { cartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductDetailsProps {
  product: ProductParams;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : (product.category?.name ?? "Uncategorized");

  const handleAddToCart = () => {
    const addItem = cartStore.getState().addItem;
    addItem(product);
    toast.success("Check Cart");
  };
  return (
    <div className="bg-slate-50 px-4 pt-8 pb-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div className="overflow-hidden rounded-xl bg-white">
            <Image
              src={product.image_url_array[0]}
              alt={product.name}
              className="h-105 w-full object-cover md:h-135"
              width={1280}
              height={720}
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-slate-500 uppercase">
                {categoryName}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, index) => (
                  <Image
                    key={`star-${index}`}
                    className="h-4 w-4"
                    src={assets.star_icon}
                    alt="star_icon"
                  />
                ))}
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <span>(4.5)</span>
            </div>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-6 flex items-end gap-3">
              <p className="text-3xl font-semibold text-slate-900">
                {env.NEXT_PUBLIC_CURRENCY}
                {product?.price}
              </p>
              <span className="text-base font-normal text-slate-400 line-through">
                {env.NEXT_PUBLIC_CURRENCY}
                {product?.offer_price}
              </span>
            </div>

            <div className="my-6 h-px w-full bg-slate-200" />

            <div className="overflow-x-auto">
              <table className="w-full max-w-md table-auto border-collapse text-left">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-2.5 pr-6 font-medium text-slate-600">
                      Brand
                    </td>
                    <td className="py-2.5 text-slate-500">{product.brand}</td>
                  </tr>
                  {product?.colors && (
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 pr-6 font-medium text-slate-600">
                        Colors
                      </td>
                      <td className="py-2.5 text-slate-500">
                        {product.colors.map((each) => `${each} `)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2.5 pr-6 font-medium text-slate-600">
                      Category
                    </td>
                    <td className="py-2.5 text-slate-500">{categoryName}</td>
                  </tr>
                </tbody>
              </table>

              {product.product_comment && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {product.product_comment}
                </div>
              )}

              {product.sizes?.length ? (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    Sizes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((each, index) => (
                      <button
                        key={`${each}-${index}`}
                        type="button"
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white"
                      >
                        {each}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Add to Cart
              </button>

              <Link
                href={`/buy-now/${product.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-[#fce3c7] transition hover:bg-slate-700"
              >
                Buy now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {product.image_url_array.length > 1 && (
        <div className="mx-auto mt-8 max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {product.image_url_array.map((eachImage, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
              >
                <Image
                  src={eachImage}
                  alt={`Product extra image ${index}`}
                  className="h-56 w-full rounded-xl object-cover"
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
