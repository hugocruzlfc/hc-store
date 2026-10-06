import { ProductParams } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: ProductParams;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`product/${product.id}`}
      className="flex w-full cursor-pointer flex-col items-start gap-0.5"
    >
      <div className="group relative flex w-full cursor-pointer items-center justify-center bg-gray-500/10">
        <div className="">
          <Image
            src={product.image_url_array[0]}
            alt={product.name}
            className="object-contain transition group-hover:scale-105"
            width={400}
            height={400}
          />
        </div>
      </div>

      <p className="w-full truncate pt-2 font-medium md:text-base">
        {product.name}
      </p>
      <p className="w-full truncate text-xs text-gray-500/70 max-sm:truncate">
        {product.description}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
      </div>

      <div className="mt-1 flex w-full items-end justify-between">
        <p className="text-base font-medium">
          {process.env.currency}
          {product.price}
        </p>
        <button className="rounded-full border border-gray-500/20 px-4 py-1.5 text-xs text-gray-500 transition hover:bg-slate-50 max-sm:hidden">
          Buy now
        </button>
      </div>
    </Link>
  );
}
