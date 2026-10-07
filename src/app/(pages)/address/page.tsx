import { fetchAddresses } from "@/features/address/actions/address";
import AddressCard from "@/features/address/address-card";
import NewAddress from "@/features/address/new-address";
import { AddressParams } from "@/shared/types";
import { Metadata } from "next";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = { title: "My Addresses" };

export default async function Page() {
  const addresses = await fetchAddresses();

  return (
    <>
      <NewAddress />

      {addresses && addresses.length > 0 && (
        <>
          <div className="flex flex-col items-center">
            <div className="mt-16 mb-4 flex flex-col items-center">
              <p className="text-3xl font-medium">
                My
                <span className="font-medium text-[#043033]">Addresses</span>
              </p>
              <div className="mt-2 h-0.5 w-28 bg-[#043033]"></div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#043033] md:flex-row">
            {addresses &&
              addresses.map((address: AddressParams, index: number) => (
                <AddressCard address={address} key={index} />
              ))}
          </div>
        </>
      )}
    </>
  );
}
