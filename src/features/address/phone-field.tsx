"use client";

import { Address, AddressSetter, Region } from "./types";

interface Props {
  selectedRegion?: Region | null;
  userAddressDetails: Address;
  setUserAddressDetails: AddressSetter;
}

export default function PhoneField({
  selectedRegion,
  userAddressDetails,
  setUserAddressDetails,
}: Props) {
  return (
    <div className="flex space-x-3">
      <div className="w-full max-w-xs">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-400"
        ></label>
        <div className="flex">
          <div className="relative inline-flex w-40 items-center rounded-l-md border border-gray-600 bg-gray-800 px-3 py-2">
            <select
              className="w-full appearance-none bg-transparent text-sm text-gray-300 focus:outline-none"
              name="country-code"
              id="country-code"
            >
              {!userAddressDetails.region && (
                <option value="" data-countrycode="">
                  Select Region Above
                </option>
              )}
              {userAddressDetails.region && (
                <option
                  value={selectedRegion?.region}
                  data-countrycode={selectedRegion?.code}
                >
                  {selectedRegion?.flag}
                  {selectedRegion?.code}
                </option>
              )}
            </select>
          </div>
          <input
            onChange={(e) =>
              setUserAddressDetails((prev) => ({
                ...prev,
                phone: e.target.value.trim(),
              }))
            }
            disabled={!userAddressDetails.region}
            className="w-full rounded-r-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
            placeholder="Phone number"
            name="phone"
            id="phone"
            type="tel"
            value={userAddressDetails.phone}
          />
        </div>
      </div>
    </div>
  );
}
