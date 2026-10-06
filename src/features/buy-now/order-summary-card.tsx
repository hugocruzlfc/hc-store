"use client";

import { AddressParams, ProductParams } from "@/shared/types";
import Link from "next/link";

interface OrderSummaryCardProps {
  addresses: AddressParams[];
  selectedAddress: AddressParams | null;
  product: ProductParams;
  totalCost: number;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onAddressSelect: (address: AddressParams) => void;
  onPayNow: () => void | Promise<void>;
}

export default function OrderSummaryCard({
  addresses,
  selectedAddress,
  product,
  totalCost,
  isDropdownOpen,
  onToggleDropdown,
  onAddressSelect,
  onPayNow,
}: OrderSummaryCardProps) {
  return (
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
          <div className="relative inline-block w-full border px-2 text-sm">
            <button
              onClick={onToggleDropdown}
              className="peer w-full bg-white px-4 py-2 pr-2 text-left text-gray-700 focus:outline-none"
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.address ?? ""}, ${selectedAddress.city ?? ""}, ${selectedAddress.state ?? ""}`
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
                    onClick={() => onAddressSelect(address)}
                    key={address.id}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-500/10"
                  >
                    {address.address ?? ""}, {address.city ?? ""},{" "}
                    {address.state ?? ""}
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
              onClick={onPayNow}
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
  );
}
