import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "https://bexzrpenlcbuxkjsqeyd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleHpycGVubGNidXhranNxZXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTY2OTcsImV4cCI6MjA5NjQzMjY5N30.IB2IasXkEXe-vDycP_KOlklFvpH2Kgoglo5FvhxdJCY";
if (!/^https?:\/\//i.test(supabaseUrl.trim())) {
  throw new Error(
    `VITE_SUPABASE_URL must start with https:// (got ${JSON.stringify(supabaseUrl)}). Fix it in the host's environment variables and rebuild.`
  );
}
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
export {
  supabase as s
};
