import { ProductParams } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: ProductParams;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="relative flex w-full items-center justify-center bg-slate-100/80 p-3">
        <Image
          src={product.image_url_array[0]}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          width={400}
          height={400}
        />
      </div>

      <div className="space-y-2 p-4">
        <p className="w-full truncate text-base font-medium text-slate-900">
          {product.name}
        </p>

        <p className="w-full truncate text-sm text-slate-500 max-sm:truncate">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>★</span>
          <span>{4.5}</span>
        </div>

        <div className="mt-2 flex w-full items-end justify-between gap-3">
          <p className="text-lg font-semibold text-slate-900">
            {process.env.currency}
            {product.price}
          </p>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition group-hover:bg-slate-900 group-hover:text-[#fce3c7] max-sm:hidden">
            Buy now
          </span>
        </div>
      </div>
    </Link>
  );
}
