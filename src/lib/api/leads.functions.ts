import { supabase } from "@/lib/db/client";
import {
  leadInsertSchema,
  leadUpdateSchema,
  type LeadInsert,
  type LeadStatus,
  type LeadUpdate,
} from "@/lib/db/schemas";
import { parseInput } from "@/lib/validation";
import { getRange } from "@/lib/api/pagination";

export const LEAD_SELECT =
  "id, user_id, name, phone, email, source, interested_in, proposed_price, notes, next_task, status, created_at, updated_at";

export type ListLeadsOptions = {
  status?: LeadStatus;
  page?: number;
  pageSize?: number;
};

export async function listLeads(userId: string, options: ListLeadsOptions = {}) {
  const { status, page, pageSize } = options;
  const { from, to } = getRange(page, pageSize);
  let query = supabase
    .from("leads")
    .select(LEAD_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function listRecentLeads(userId: string, limit = 3) {
  const { data, error } = await supabase
    .from("leads")
    .select(LEAD_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(Math.min(Math.max(1, limit), 20));

  if (error) throw error;
  return data ?? [];
}

export async function createLead(userId: string, input: LeadInsert) {
  const validInput = parseInput(leadInsertSchema, input);
  const { data, error } = await supabase
    .from("leads")
    .insert({ ...validInput, user_id: userId, created_by: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLead(leadId: string, userId: string, updates: LeadUpdate) {
  const validUpdates = parseInput(leadUpdateSchema, updates);
  const { data, error } = await supabase
    .from("leads")
    .update({ ...validUpdates, updated_by: userId })
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
