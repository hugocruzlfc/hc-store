"use client";

import { useAppContext } from "@/features/auth/context/app-context";

export default function ProfileHeader() {
  const { session } = useAppContext();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-sm">
          {session?.user.email?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold text-slate-900">
            {session?.user.email ?? "Usuario"}
          </h2>
          <p className="mt-1 truncate text-sm text-slate-500">
            {session?.user.id ?? "No user id available"}
          </p>
        </div>
      </div>
    </div>
  );
}
