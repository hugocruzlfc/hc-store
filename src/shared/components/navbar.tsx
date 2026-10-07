"use client";

import { assets } from "@/assets";
import { signOut } from "@/features/auth/actions/auth-action";
import { useAppContext } from "@/features/auth/context/app-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HamX from "./ham-x";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { session, setSession } = useAppContext();

  const router = useRouter();

  const checkIn = () => {
    setUserOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    router.push("/");
  };
  return (
    <nav className="flex items-center justify-between bg-black px-6 py-3 text-white md:px-16 lg:px-32">
      <div className="flex items-center gap-3">
        <Link href="/">
          <h1 className="text-[#fce3c7]">HC Store</h1>
        </Link>
      </div>
      <div className="flex items-center gap-6 max-md:hidden lg:gap-8">
        <Link href="/" className="transition hover:text-gray-400">
          Home
        </Link>
        <Link href="/all-products" className="transition hover:text-gray-400">
          Shop
        </Link>
        <Link href="/about" className="transition hover:text-gray-400">
          About Us
        </Link>
        <Link href="/contact" className="transition hover:text-gray-400">
          Contact
        </Link>
      </div>

      <div>
        <ul className="hidden items-center gap-4 md:flex">
          <button>
            <Image className="h-4 w-4" src={assets.search_icon} alt="search" />
          </button>

          <button className="flex items-center gap-2 transition hover:text-gray-400">
            <Image src={assets.heart_icon} alt="favorite" className="w-4" />
          </button>

          <Link
            href={"/cart"}
            className="flex items-center gap-2 transition hover:text-gray-400"
          >
            <Image src={assets.cart_icon} alt="cart" />
          </Link>

          <button
            onClick={checkIn}
            className="flex items-center gap-2 transition hover:text-gray-400"
          >
            <Image src={assets.user_icon} alt="user" />
          </button>
        </ul>
        {/* for mobile view */}
        <div className="flex items-center justify-center gap-3 md:hidden">
          <button>
            <Image className="h-6 w-6" src={assets.search_icon} alt="search" />
          </button>

          <button className="flex items-center gap-2 transition hover:text-gray-400">
            <Image src={assets.cart_icon} alt="cart" className="h-6 w-6" />
          </button>
          <button
            onClick={checkIn}
            className="flex items-center gap-2 transition hover:text-gray-400"
          >
            <Image src={assets.user_icon} alt="user" className="h-6 w-6" />
          </button>

          <HamX isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {userOpen && (
          <div className="flex-full absolute top-23 right-0 z-10 flex h-50 w-87.5 flex-col rounded-b-2xl bg-black text-white max-md:top-12 md:top-12">
            <div className="flex flex-row items-center justify-center">
              {session ? (
                <p className="mr-2 text-[#fce3c7]">{session?.user.email}</p>
              ) : (
                <div>
                  <Link
                    href="/login"
                    className="transition hover:text-gray-400"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {session && (
              <div className="mt-2 flex flex-col items-center gap-2">
                <Link
                  href="/profile"
                  className="transition hover:text-gray-400"
                >
                  My Profile
                </Link>
                <Link href="/orders" className="transition hover:text-gray-400">
                  My Orders
                </Link>
                <Link
                  href="/reviews"
                  className="transition hover:text-gray-400"
                >
                  My Reviews
                </Link>

                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="flex-full absolute top-13 right-0 z-10 flex h-full w-[70%] flex-col bg-black text-white md:hidden">
          <div className="mt-16 flex flex-col items-center gap-6">
            <Link href="/" className="transition hover:text-gray-400">
              Home
            </Link>
            <Link
              href="/all-products"
              className="transition hover:text-gray-400"
            >
              Shop
            </Link>
            <Link href="/about" className="transition hover:text-gray-400">
              About Us
            </Link>
            <Link href="/contact" className="transition hover:text-gray-400">
              Contact
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 transition hover:text-gray-400"
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
