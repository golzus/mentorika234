import { supabase } from "@/lib/db/client";
import type { LeadInsert, LeadStatus, LeadUpdate } from "@/lib/db/schemas";

export async function listLeads(userId: string, status?: LeadStatus) {
  let query = supabase
    .from("leads")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createLead(userId: string, input: LeadInsert) {
  const { data, error } = await supabase
    .from("leads")
    .insert({ ...input, user_id: userId, created_by: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLead(leadId: string, userId: string, updates: LeadUpdate) {
  const { data, error } = await supabase
    .from("leads")
    .update({ ...updates, updated_by: userId })
    .eq("id", leadId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLead(leadId: string, userId: string) {
  const { error } = await supabase.from("leads").delete().eq("id", leadId).eq("user_id", userId);

  if (error) throw error;
}
