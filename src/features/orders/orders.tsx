"use client";

import { Navbar } from "@/shared/components/navbar";
import { OrderParams } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

interface OrdersProps {
  orders: OrderParams[];
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">My Orders</h2>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
            {orders.length} orders
          </span>
        </div>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex max-w-md flex-1 items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-slate-200">
                    <Image
                      className="h-full w-full object-cover"
                      src={order.image_url}
                      alt="box_icon"
                      width={150}
                      height={150}
                      quality={100}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-slate-900">
                      {order.product_name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Quantity: {order.quantity_bought}
                    </p>
                    {order.size && (
                      <p className="mt-1 text-sm text-slate-500">
                        Size: {order.size}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-sm text-slate-600 lg:w-52">
                  <p>{order.region}</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {order.address}
                  </p>
                  <p className="mt-1">{`${order.state}, ${order.city}`}</p>
                  <p className="mt-1">{`${order.country_code}${order.phone}`}</p>
                </div>

                <div className="lg:w-36">
                  <p className="text-sm text-slate-500">Amount paid</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {process.env.NEXT_PUBLIC_CURRENCY}
                    {order.amount_paid}
                  </p>
                </div>

                <div className="lg:w-64">
                  <p className="text-sm text-slate-500">
                    Date: {order.created_at ? order.created_at : "N/A"}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Status: {order.status}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(order.status === "completed" ||
                      order.status === "cancelled") && (
                      <button className="rounded-lg bg-red-400 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-red-500">
                        Delete
                      </button>
                    )}

                    {order.status !== "reviewed" &&
                      order.status !== "processing" &&
                      order.status === "completed" && (
                        <Link
                          href={`/add-review/${order.id}`}
                          className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-[#fce3c7] transition hover:bg-slate-700"
                        >
                          Review product
                        </Link>
                      )}

                    <Link
                      href={`/order/${order.id}`}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
