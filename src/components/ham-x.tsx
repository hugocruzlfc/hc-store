"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

interface HamXParams {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const HamX = ({ isOpen, setIsOpen }: HamXParams) => {
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 hover:text-gray-400"
        >
          <Image src={assets.hamIcon} alt="Toggle" className="h-6 w-6" />
        </button>
      )}
      {isOpen && (
        <button onClick={toggleMenu} className="text-2xl text-gray-500">
          X
        </button>
      )}
    </div>
  );
};

export default HamX;
