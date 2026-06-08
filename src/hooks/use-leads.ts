import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listLeads,
  createLead,
  updateLead,
  deleteLead,
  type ListLeadsOptions,
} from "@/lib/api/leads.functions";
import type { Lead, LeadInsert, LeadStatus, LeadUpdate } from "@/lib/db/schemas";

export function useLeads(
  userId: string | undefined,
  statusOrOptions?: LeadStatus | ListLeadsOptions,
) {
  const options =
    typeof statusOrOptions === "string" ? { status: statusOrOptions } : (statusOrOptions ?? {});

  return useQuery({
    queryKey: ["leads", userId, options],
    queryFn: async () => {
      const data = await listLeads(userId!, options);
      return data as Lead[];
    },
    enabled: !!userId,
  });
}

export function useCreateLead(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LeadInsert) => createLead(userId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    },
  });
}

export function useUpdateLead(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ leadId, updates }: { leadId: string; updates: LeadUpdate }) =>
      updateLead(leadId, userId, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    },
  });
}

export function useDeleteLead(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (leadId: string) => deleteLead(leadId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    },
  });
}
