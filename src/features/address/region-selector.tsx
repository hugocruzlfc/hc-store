"use client";

import { useEffect, useRef, useState } from "react";
import { Address, AddressSetter, Region } from "./types";

interface Props {
  allRegions: Region[];
  setSelectedRegion: (r: Region) => void;
  userAddressDetails: Address;
  setUserAddressDetails: AddressSetter;
}

export default function RegionSelector({
  allRegions,
  setSelectedRegion,
  userAddressDetails,
  setUserAddressDetails,
}: Props) {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const [openRegion, setOpenRegion] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      ) {
        setOpenRegion(false);
      }
    };

    const handleScroll = () => setOpenRegion(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="relative inline-flex w-[320px]">
      <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
        <button
          onClick={() => setOpenRegion((v) => !v)}
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
        >
          Country/Region
        </button>

        <button
          onClick={() => setOpenRegion((v) => !v)}
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
          aria-label="Menu"
        >
          {!openRegion ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75 12 8.25l7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
      </span>

      <input
        type="hidden"
        name="region"
        value={userAddressDetails.region.trim()}
      />

      {openRegion && (
        <div
          ref={regionRef}
          role="menu"
          className="absolute inset-e-0 top-12 z-auto flex w-full flex-col items-start overflow-hidden rounded border border-gray-300 bg-black shadow-sm"
        >
          {allRegions.map((eachRegion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setUserAddressDetails((prevState) => ({
                  ...prevState,
                  region: `${eachRegion.region.trim()}`,
                  countryCode: `${eachRegion.code.trim()}`,
                  flag: `${eachRegion.flag.trim()}`,
                }));
                setSelectedRegion(eachRegion);
                setOpenRegion(false);
              }}
              className="w-full px-3 py-2 text-left text-sm font-medium text-gray-300 transition-colors hover:text-gray-400"
              role="menuitem"
            >
              {eachRegion.region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
