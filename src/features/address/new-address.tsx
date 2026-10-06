"use client";

import { assets } from "@/assets";
import { saveAddressDB } from "@/features/address/actions/address";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneField from "./phone-field";
import RegionSelector from "./region-selector";
import { Address, Region } from "./types";

export default function NewAddress() {
  const router = useRouter();
  const [userAddressDetails, setUserAddressDetails] = useState<Address>({
    region: "",
    title: "",
    address: "",
    state: "",
    city: "",
    phone: "",
    flag: "",
    countryCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | undefined>();
  const allRegions = [
    { region: "Nigeria", code: "+234", flag: "🇳🇬" },
    { region: "Ghana", code: "+233", flag: "🇬🇭" },
  ];

  const disabled =
    !userAddressDetails.region ||
    !userAddressDetails.title ||
    !userAddressDetails.address ||
    !userAddressDetails.state ||
    !userAddressDetails.city ||
    !userAddressDetails.phone;

  const handleAddress = async () => {
    setLoading(true);
    try {
      if (
        !userAddressDetails.address ||
        !userAddressDetails.region ||
        !userAddressDetails.phone ||
        !userAddressDetails.state ||
        !userAddressDetails.title
      ) {
        return;
      }
      //call function to save address to supabase database
      const saveResult = await saveAddressDB(userAddressDetails);

      if (saveResult.success === false) {
        toast.error("Your address wasn't saved yet. Please try again.");
        return;
      }

      toast.success("Address saved successfully");
      setUserAddressDetails({
        region: "",
        title: "",
        address: "",
        state: "",
        city: "",
        phone: "",
        flag: "",
        countryCode: "",
      });
      router.back();
    } catch (error) {
      console.log("error saving address", error);
    } finally {
      setLoading(false);
    }
  };

  // removed unused helper handleSetUserAddressDetails

  return (
    <>
      <div className="flex flex-col justify-between px-6 py-16 md:flex-row md:px-16 lg:px-32">
        <div className="w-full">
          <p className="text-2xl text-gray-500 md:text-3xl">
            Add Shipping{" "}
            <span className="font-semibold text-[#1a9376]">Address</span>
          </p>
          <div className="mt-10 max-w-sm space-y-3">
            {/* region selector */}
            <RegionSelector
              allRegions={allRegions}
              setSelectedRegion={setSelectedRegion}
              userAddressDetails={userAddressDetails}
              setUserAddressDetails={setUserAddressDetails}
            />

            <h2 className="text-3xl text-black">{userAddressDetails.region}</h2>
            <input
              className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-[#1a9376]"
              type="text"
              placeholder="The Title Of The Address e.g.Home "
              name="title"
              onChange={(e) =>
                setUserAddressDetails({
                  ...userAddressDetails,
                  title: e.target.value,
                })
              }
              value={userAddressDetails.title}
            />
            <textarea
              className="w-full resize-none rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-[#1a9376]"
              rows={4}
              placeholder="Full Address e.g number 9 Solanke Ebube Street"
              name="address"
              onChange={(e) =>
                setUserAddressDetails({
                  ...userAddressDetails,
                  address: e.target.value,
                })
              }
              value={userAddressDetails.address}
            ></textarea>
            <input
              className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-[#1a9376]"
              type="text"
              placeholder="Just the name of the State e.g Anambra"
              name="state"
              onChange={(e) =>
                setUserAddressDetails({
                  ...userAddressDetails,
                  state: e.target.value,
                })
              }
              value={userAddressDetails.state}
            />
            <input
              className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-[#1a9376]"
              type="text"
              placeholder="City e.g Lagos. "
              name="city"
              onChange={(e) =>
                setUserAddressDetails({
                  ...userAddressDetails,
                  city: e.target.value.trim(),
                })
              }
              value={userAddressDetails.city}
            />

            <PhoneField
              selectedRegion={selectedRegion}
              userAddressDetails={userAddressDetails}
              setUserAddressDetails={setUserAddressDetails}
            />
            <p className="text-black">
              {userAddressDetails.region &&
                userAddressDetails.phone &&
                `This is your phone number: ${selectedRegion?.code} ${userAddressDetails.phone}`}
            </p>

            {!userAddressDetails.region && (
              <button className="py-3 text-sm text-gray-600">
                <span className="text-red-400">***</span>Please Select A region
                Above.
                <span className="text-red-400">***</span>
              </button>
            )}
            {disabled && (
              <button className="py-3 text-sm text-gray-600">
                <span className="text-red-400">***</span>All Fields Must Be
                Filled To Continue
                <span className="text-red-400">***</span>
              </button>
            )}
          </div>
          <button
            disabled={disabled}
            onClick={() => {
              handleAddress();
            }}
            type="submit"
            className={`mt-6 w-full max-w-sm ${
              disabled ? "bg-gray-400" : "bg-[#1a9376]"
            } py-3 text-white uppercase hover:bg-black`}
          >
            {loading ? "Saving Address" : "Save address"}
          </button>
        </div>
        <Image
          className="mt-16 md:mt-0 md:mr-16"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
    </>
  );
}
