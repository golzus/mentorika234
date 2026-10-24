import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY",
  );
}

// VITE_* values are inlined at build time, so a bad value in the host's env only shows up here.
if (!/^https?:\/\//i.test(supabaseUrl.trim())) {
  throw new Error(
    `VITE_SUPABASE_URL must start with https:// (got ${JSON.stringify(supabaseUrl)}). ` +
      "Fix it in the host's environment variables and rebuild.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
