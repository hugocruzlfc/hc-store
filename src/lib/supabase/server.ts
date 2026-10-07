import { env } from "@/lib/env/client";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { cache } from "react";
import { DatabaseType } from "./types";

export function supabasePublicServerClient() {
  return createClient<DatabaseType>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export async function supabaseServerClient() {
  const cookieStore = await cookies();

  // Server-side Supabase client wired to Next's cookie store so the
  // user's session is maintained across server components and actions.
  return createServerClient<DatabaseType>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` was called from a Server Component. Safe to ignore
            // because the proxy refreshes user sessions on every request.
          }
        },
      },
    },
  );
}

/**
 * Wrapping in `cache()` means this runs exactly once per request even if
 * several server components ask for the user at the same time.
 */
export const getCachedUser = cache(async () => {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
