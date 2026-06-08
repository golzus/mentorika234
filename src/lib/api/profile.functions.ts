import { supabase } from "@/lib/db/client";
import { profileUpdateSchema, type ProfileUpdate } from "@/lib/db/schemas";
import { parseInput } from "@/lib/validation";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, first_name, last_name, business_field, business_name, slogan, golden_circle, monthly_salary_target, new_clients_target, created_at, updated_at",
    )
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function upsertProfile(userId: string, updates: ProfileUpdate) {
  const validUpdates = parseInput(profileUpdateSchema, updates);
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...validUpdates })
    .select()
    .single();

  if (error) throw error;
  return data;
}
