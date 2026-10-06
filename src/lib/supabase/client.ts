import { env } from "@/lib/env/client";

import { createBrowserClient } from "@supabase/ssr";
import { DatabaseType } from "./types";

export const supabaseClient = () =>
  createBrowserClient<DatabaseType>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
