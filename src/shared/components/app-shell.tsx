"use client";

import { Navbar } from "@/shared/components/navbar";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const ROUTES_WITHOUT_NAVBAR = ["/login"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNavbar = !ROUTES_WITHOUT_NAVBAR.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
