import { redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/db/client";

export async function requireAuth() {
  if (typeof window === "undefined") return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect({ to: "/login" });
  }
}

export async function redirectAuthenticated() {
  if (typeof window === "undefined") return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    throw redirect({ to: "/" });
  }
}
