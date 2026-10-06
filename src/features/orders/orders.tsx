"use client";

import { OrderParams } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

interface OrdersProps {
  orders: OrderParams[];
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between px-6 py-6 md:px-16 lg:px-32">
      <div className="space-y-5">
        <h2 className="mt-6 text-lg font-medium">My Orders</h2>
        <div className="max-w-5xl border-t border-gray-300 text-sm">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-5 border-b border-gray-300 p-5 md:flex-row"
            >
              <div className="flex max-w-80 flex-1 gap-5">
                <Image
                  className="max-h-16 max-w-16 object-cover"
                  src={order.image_url}
                  alt="box_icon"
                  width={150}
                  height={150}
                  quality={100}
                />
                <p className="flex flex-col gap-3">
                  <span className="text-base font-medium">
                    {order.product_name + ` x ${order.quantity_bought}`}
                  </span>
                  <span>Items : {order.quantity_bought}</span>
                  {order.size && <span>Size {order.size}</span>}
                </p>
              </div>
              <div>
                <p>
                  <span>{order.region}</span>

                  <br />
                  <span className="font-medium">{order.address}</span>
                  <br />
                  <span>{`${order.state}, ${order.city}`}</span>
                  <br />
                  <span>{`${order.country_code}${order.phone}`}</span>
                </p>
              </div>
              <div>
                <p>Amount paid</p>
                <p className="my-auto font-medium">
                  {process.env.NEXT_PUBLIC_CURRENCY}
                  {order.amount_paid}
                </p>
              </div>
              <div>
                <div className="flex flex-col">
                  <span>
                    Date : {order.created_at ? order.created_at : "N/A"}
                  </span>
                  <span>status: {order.status}</span>
                  <div className="flex flex-row gap-2">
                    {(order.status === "completed" ||
                      order.status === "cancelled") && (
                      <button className="rounded-lg bg-red-400 p-1">
                        Delete
                      </button>
                    )}
                    {order.status !== "reviewed" &&
                      order.status !== "processing" &&
                      order.status === "completed" && (
                        <Link
                          href={`/add-review/${order.id}`}
                          className="rounded-lg bg-black p-1 text-[#fce3c7]"
                        >
                          Review product
                        </Link>
                      )}
                    <Link
                      href={`/order/${order.id}`}
                      className="rounded-lg bg-black p-1 text-[#fce3c7]"
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
