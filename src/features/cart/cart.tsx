"use client";

import { assets } from "@/assets";
import { AddressParams } from "@/shared/types";
import { cartStore } from "@/store/cart-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../auth/context/app-context";

interface CartProps {
  addresses: AddressParams[];
}

export default function Cart({ addresses }: CartProps) {
  const router = useRouter();
  const { items, decreaseQty, increaseQty } = cartStore((state) => state);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { session } = useAppContext();

  const defaultAddress = addresses.filter(
    (eachAddresses) => eachAddresses.is_default === true,
  )[0];

  const totalCost = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const deducedShippingFee = items.reduce((total, item) => {
    return total + (item.product_shipping_fee ?? 0) * item.quantity;
  }, 0);

  const payNow = async () => {
    try {
      const result = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          amount: totalCost * 100 + deducedShippingFee * 100,
          source: "cart",
        }),
      });

      const paystackResult = await result.json();

      if (result.status) {
        localStorage.setItem(
          "paymentInformation",
          JSON.stringify({
            userId: session?.user?.id,
            userEmail: session?.user?.email,
            fullAddressFields: defaultAddress,
            items: items,
            amount: totalCost * 100 + deducedShippingFee * 100,
          }),
        );
        router.push(paystackResult.data.authorization_url);
      }
    } catch (error) {
      console.log("Payment Error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      console.log("Payment Processed");
    }
  };
  return (
    <div
      className={`} mb-20 flex flex-col gap-10 px-6 pt-14 md:flex-row md:px-16 lg:px-32`}
    >
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between border-b border-gray-500/30 pb-6">
          <p className="text-2xl text-gray-500 md:text-3xl">
            Your <span className="font-medium text-[#043033]">Cart</span>
          </p>
          <p className="text-lg text-gray-500/80 md:text-xl">
            {items ? items.length : 0} items
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="text-left">
              <tr>
                <th className="px-1 pb-6 font-medium text-nowrap text-gray-600 md:px-4">
                  Product Details
                </th>
                <th className="px-1 pb-6 font-medium text-gray-600 md:px-4">
                  Price
                </th>
                <th className="px-1 pb-6 font-medium text-gray-600 md:px-4">
                  Quantity
                </th>
                <th className="px-1 pb-6 font-medium text-gray-600 md:px-4">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((eachItem, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="flex items-center gap-4 px-1 py-4 md:px-4">
                        <div>
                          <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-500/10">
                            <Image
                              src={eachItem.image_url_array[0]}
                              alt={eachItem.name}
                              className="object-cover mix-blend-multiply"
                              fill
                            />
                          </div>
                          <button className="mt-1 rounded-2xl bg-black px-2 py-1 text-xs text-[#fce3c7] md:hidden">
                            Remove
                          </button>
                        </div>
                        <div className="hidden text-sm md:block">
                          <p className="text-gray-800">{eachItem.name}</p>
                          <button className="mt-1 rounded-2xl bg-black px-2 py-1 text-xs text-[#fce3c7]">
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="px-1 py-4 text-gray-600 md:px-4">
                        {process.env.NEXT_PUBLIC_CURRENCY}
                        {eachItem.price}
                      </td>
                      <td className="px-1 py-4 md:px-4">
                        <div className="flex items-center gap-1 md:gap-2">
                          <button onClick={() => decreaseQty(eachItem.id)}>
                            <Image
                              src={assets.decrease_arrow}
                              alt="increase_arrow"
                              className="h-4 w-4"
                            />
                          </button>
                          <input
                            readOnly
                            type="text"
                            value={eachItem.quantity}
                            className="w-8 appearance-none border text-center"
                          ></input>

                          <button onClick={() => increaseQty(eachItem.id)}>
                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="h-4 w-4"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="px-1 py-4 text-gray-600 md:px-4">
                        {process.env.NEXT_PUBLIC_CURRENCY}
                        {(eachItem.price * eachItem.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <button className="group mt-6 flex items-center gap-2 rounded-2xl bg-black px-4 py-2 text-[#fce3c7] transition hover:bg-gray-800">
          <Image
            className="transition group-hover:-translate-x-1"
            src={assets.arrow_right_icon_colored}
            alt="arrow_right_icon_colored"
          />
          Continue Shopping
        </button>
      </div>
      {/* <OrderSummary /> */}
      <div className="w-full bg-gray-500/5 p-5 md:w-96">
        <h2 className="text-xl font-medium text-gray-700 md:text-2xl">
          Order Summary
        </h2>
        <hr className="my-5 border-gray-500/30" />
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-base font-medium text-gray-600 uppercase">
              Select Address
            </label>
            <div className="relative inline-block w-full border text-sm">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="peer w-full bg-white px-4 py-2 pr-2 text-left text-gray-700 focus:outline-none"
              >
                <span>
                  {defaultAddress
                    ? `${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state}`
                    : "Select Address"}
                </span>
                <svg
                  className={`float-right inline h-5 w-5 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#6B7280"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full border bg-white py-1.5 shadow-md">
                  {addresses?.map((address, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-500/10"
                    >
                      {address.address}, {address.city}, {address.state},
                      {address.state}
                    </li>
                  ))}
                  <li
                    onClick={() => router.push("/address")}
                    className="cursor-pointer px-4 py-2 text-center hover:bg-gray-500/10"
                  >
                    + Add New Address
                  </li>
                </ul>
              )}
            </div>
          </div>

          <hr className="my-5 border-gray-500/30" />

          <div className="space-y-4">
            <div className="flex justify-between text-base font-medium">
              <p className="text-gray-600 uppercase">Items {items?.length}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping Fee</p>
              <p className="font-medium text-gray-800">
                {process.env.NEXT_PUBLIC_CURRENCY}
                {deducedShippingFee}
                {/* {myCartItems?.reduce((total, item) => {
                      const fee = item.cart_item_shipping_fee ?? 0; // default to 0 if undefined
                      return total + fee;
                    }, 0)} */}
              </p>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-medium md:text-xl">
              <p>Total</p>
              <p>
                {process.env.NEXT_PUBLIC_CURRENCY}
                {totalCost}
                {/* {myCartItems?.reduce((total, item) => {
                      return total + item.price * item.quantity;
                    }, 0)} */}
              </p>
            </div>
          </div>
        </div>

        {defaultAddress ? (
          <button
            onClick={payNow}
            className="align-center mt-5 w-full bg-black p-3 text-center text-white hover:bg-[#043033]"
          >
            Pay Now
          </button>
        ) : (
          <button className="mt-5 w-full py-3 text-gray-600">
            **Please Select An Address To Continue
          </button>
        )}
      </div>

      {/* end of summary */}
    </div>
  );
}
