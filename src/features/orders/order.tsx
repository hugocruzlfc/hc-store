"use client";

import { Navbar } from "@/shared/components/navbar";
import { OrderParams } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

interface OrderProps {
  orderData: OrderParams;
}

export default function Order({ orderData }: OrderProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/orders"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            ← Back to orders
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-2 lg:p-10">
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={orderData.image_url}
                alt={orderData.product_name}
                className="h-full w-full object-cover"
                width={1280}
                height={720}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
                  Order details
                </p>
                <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-emerald-700 uppercase">
                  {orderData.status}
                </span>
              </div>

              <h1 className="text-3xl font-semibold text-slate-900">
                {orderData.product_name}
              </h1>

              <p className="mt-6 text-3xl font-semibold text-slate-900">
                {process.env.NEXT_PUBLIC_CURRENCY} {orderData.amount_paid}
              </p>

              <hr className="my-6 border-slate-200" />

              <div className="overflow-x-auto">
                <table className="w-full max-w-md table-auto border-collapse text-left">
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-600">
                        Region
                      </td>
                      <td className="py-2 text-slate-700">
                        {orderData.region}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-600">
                        State
                      </td>
                      <td className="py-2 text-slate-700">{orderData.state}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-600">
                        City
                      </td>
                      <td className="py-2 text-slate-700">{orderData.city}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-600">
                        Phone
                      </td>
                      <td className="py-2 text-slate-700">
                        {orderData.country_code}
                        {orderData.phone}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
