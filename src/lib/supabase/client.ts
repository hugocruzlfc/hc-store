import { env } from "@/lib/env/client";
import { createBrowserClient } from "@supabase/ssr";

export const supabaseClient = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
