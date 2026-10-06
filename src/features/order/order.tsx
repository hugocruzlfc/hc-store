"use client";

import { OrderParams } from "@/shared/types";
import Image from "next/image";

interface OrderProps {
  orderData: OrderParams;
}

export default function Order({ orderData }: OrderProps) {
  return (
    <div className="space-y-10 px-6 pt-14 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-500/10">
            <Image
              src={orderData.image_url}
              alt="alt"
              className="h-auto w-full object-cover mix-blend-multiply"
              width={1280}
              height={720}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="mb-4 text-3xl font-medium text-gray-800/90">
            {orderData.product_name}
          </h1>

          <p className="mt-6 text-3xl font-medium">
            {process.env.NEXT_PUBLIC_CURRENCY} {orderData.amount_paid}
          </p>
          <hr className="my-6 bg-gray-600" />
          <div className="overflow-x-auto">
            <table className="w-full max-w-72 table-auto border-collapse">
              <tbody>
                <tr>
                  <td className="font-medium text-gray-600">Region</td>
                  <td className="text-gray-800/50">{orderData.region}</td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-600">State</td>
                  <td className="text-gray-800/50">{orderData.state}</td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-600">City</td>
                  <td className="text-gray-800/50">{orderData.city}</td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-600">Phone</td>
                  <td className="text-gray-800/50">
                    {orderData.country_code}
                    {orderData.phone}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <p>Order Status: {orderData.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
