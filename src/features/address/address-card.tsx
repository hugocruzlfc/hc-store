"use client";

import { makeDefaultAddress } from "@/features/address/actions/address";
import { AddressParams } from "@/lib/types";
import Link from "next/link";
import toast from "react-hot-toast";

interface AddressCardProps {
  address: AddressParams;
}

export default function AddressCard({ address }: AddressCardProps) {
  const handleMakeDefaultAddress = async () => {
    const defaultSuccess = await makeDefaultAddress(address.id);
    if (defaultSuccess) {
      toast.success("Address set as default successfully");
    } else {
      toast.error("Failed to set address as default.");
    }
  };
  return (
    <div className="m-4 w-full max-w-sm overflow-hidden rounded-lg bg-black shadow-md">
      <div className="px-6 py-2 text-gray-500">
        <h3 className="text-center text-xl font-medium">
          Region: {address.region}
        </h3>

        <div>
          <div className="mt-4 w-full">
            <p className="mt-2 block w-full rounded-lg border border-none placeholder-gray-500 focus:outline-none">
              Address: {address.address}
            </p>
          </div>

          <div className="mt-2 w-full">
            <p className="block w-full rounded-lg border border-none placeholder-gray-500 focus:outline-none">
              State: {address.state}
            </p>
          </div>
          <div className="mt-2 flex w-full flex-row justify-start">
            <p className="order block w-full rounded-lg border-none placeholder-gray-500 focus:outline-none">
              City: {address.city}
            </p>
          </div>
          <div className="mt-2 w-full">
            <p className="block w-full rounded-lg border border-none placeholder-gray-500 focus:outline-none">
              Phone: {address.country_code}
              {address.phone}
            </p>
          </div>
          <div className="mt-2 flex w-full flex-row justify-end">
            <Link
              href={`/`}
              className="flex-end focus:ring-opacity-50 transform rounded-lg text-sm font-medium tracking-wide text-[#fce3c7] capitalize transition-colors duration-300 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              Manage Address
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-end">
            {!address.is_default && (
              <button
                onClick={() => {
                  handleMakeDefaultAddress();
                }}
                className="focus:ring-opacity-50 transform rounded-lg bg-[#043033] px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300"
              >
                Make Default
              </button>
            )}
            {address.is_default && (
              <button className="px-6 py-2 text-sm font-medium tracking-wide text-slate-500 capitalize">
                Default Address
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gray-200 py-4 text-center">
        <span className="text-sm text-gray-500">
          We use your email to identify you!
        </span>

        <a
          href="#"
          className="mx-2 text-sm font-bold text-[#043033] hover:underline"
        >
          You can&apos;t change that
        </a>
      </div>
    </div>
  );
}
