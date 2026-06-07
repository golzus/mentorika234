import { supabase } from "@/lib/db/client";
import type { ProfileUpdate } from "@/lib/db/schemas";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function upsertProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...updates })
    .select()
    .single();

  if (error) throw error;
  return data;
}
