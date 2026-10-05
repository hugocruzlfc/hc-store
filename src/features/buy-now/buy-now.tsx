"use client";

import { assets } from "@/assets";
import { AddressParams, ProductParams } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../auth/context/app-context";

interface BuyNowProps {
  product: ProductParams;
  addresses: AddressParams[];
}

export default function BuyNow({ product, addresses }: BuyNowProps) {
  const { session } = useAppContext();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((address) => address.is_default)?.id ??
      addresses[0]?.id ??
      null,
  );

  const defaultAddress =
    addresses.find((address) => address.is_default) ?? addresses[0] ?? null;

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ??
    defaultAddress;

  const subtotal = quantity * product.price;
  const totalCost = subtotal + product.product_shipping_fee;

  useEffect(() => {
    localStorage.removeItem("paymentInformation");
  }, []);

  const increaseQTY = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQTY = () => {
    if (quantity === 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handleAddressSelect = (address: AddressParams) => {
    setSelectedAddressId(address.id);
    setIsDropdownOpen(false);
  };

  const payNow = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address to continue.");
      return;
    }

    try {
      const result = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          amount: Math.round(totalCost * 100),
          source: "buy-now",
        }),
      });

      const paystackResult = await result.json();

      if (!result.ok) {
        throw new Error(paystackResult?.message ?? "Payment request failed");
      }

      localStorage.setItem(
        "paymentInformation",
        JSON.stringify({
          userId: session?.user?.id,
          productName: product.name,
          productCategory: product.category,
          quantity,
          image: product.image_url_array[0],
          amount: totalCost,
          userEmail: session?.user?.email,
          fullAddressFields: selectedAddress,
        }),
      );

      router.push(paystackResult.data.authorization_url);
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="mb-20 flex flex-col gap-10 px-6 pt-14 md:flex-row md:px-16 lg:px-32">
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between border-b border-gray-500/30 pb-6">
          <p className="text-2xl text-gray-500 md:text-3xl">
            The Product To{" "}
            <span className="font-medium text-[#043033]">Buy</span>
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
              </tr>
            </thead>
            <tbody>
              {product && (
                <tr>
                  <td className="flex items-center gap-4 px-1 py-4 md:px-4">
                    <div>
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-500/10">
                        <Image
                          src={product.image_url_array[0]}
                          alt={product.name}
                          className="object-cover mix-blend-multiply"
                          fill
                        />
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-800">{product.name}</p>
                      <p>{product.sizes && product.sizes}</p>
                    </div>
                  </td>
                  <td className="px-1 py-4 text-gray-600 md:px-4">
                    {process.env.NEXT_PUBLIC_CURRENCY}
                    {product.price}
                  </td>
                  <td className="px-1 py-4 md:px-4">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button onClick={decreaseQTY}>
                        <Image
                          src={assets.decrease_arrow}
                          alt="decrease_arrow"
                          className="h-4 w-4"
                        />
                      </button>

                      <input
                        value={quantity}
                        readOnly
                        type="text"
                        className="w-8 appearance-none border text-center"
                      ></input>

                      <button onClick={increaseQTY}>
                        <Image
                          src={assets.increase_arrow}
                          alt="increase_arrow"
                          className="h-4 w-4"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-2">
            {product?.sizes?.map((each, index) => (
              <button
                className={`mr-1 rounded-lg px-2 py-1 text-sm`}
                key={index}
              >
                {each}
              </button>
            ))}
          </div>
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
                  {selectedAddress
                    ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
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
                  {addresses.map((address) => (
                    <li
                      onClick={() => handleAddressSelect(address)}
                      key={address.id}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-500/10"
                    >
                      {address.address}, {address.city}, {address.state}
                    </li>
                  ))}
                  <Link
                    href={`/address`}
                    className="cursor-pointer px-4 py-2 text-center hover:bg-gray-500/10"
                  >
                    + Add New Address
                  </Link>
                </ul>
              )}

              <div>
                <label className="mb-2 block text-base font-medium text-gray-600 uppercase">
                  Promo Code
                </label>
                <div className="flex flex-col items-start gap-3">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full grow border p-2.5 text-gray-600 outline-none"
                  />
                  <button className="bg-black px-9 py-2 text-white hover:bg-[#043033]">
                    Apply
                  </button>
                </div>
              </div>

              <hr className="my-5 border-gray-500/30" />

              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping Fee</p>
                  <p className="font-medium text-gray-800">
                    {process.env.NEXT_PUBLIC_CURRENCY}
                    {product.product_shipping_fee}
                  </p>
                </div>

                <div className="flex justify-between border-t pt-3 text-lg font-medium md:text-xl">
                  <p>Total</p>
                  <p>
                    {process.env.NEXT_PUBLIC_CURRENCY}
                    {totalCost}
                  </p>
                </div>
              </div>
            </div>

            {selectedAddress ? (
              <button
                onClick={payNow}
                className="align-center mt-5 w-full bg-black p-3 text-center text-white hover:bg-[#043033]"
              >
                Pay Now
              </button>
            ) : (
              <p className="mt-5 w-full py-3 text-gray-600">
                **Please Select An Address To Continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
