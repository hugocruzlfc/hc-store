import { env } from "@/lib/env";
import { createBrowserClient } from "@supabase/ssr";

export const supabaseClient = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    env.NEXT_PUBLIC_SUPABASE_URL,
  );
