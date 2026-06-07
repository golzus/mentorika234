import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listLeads, createLead, updateLead, deleteLead } from "@/lib/api/leads.functions";
import type { Lead, LeadInsert, LeadStatus, LeadUpdate } from "@/lib/db/schemas";

export function useLeads(userId: string | undefined, status?: LeadStatus) {
  return useQuery({
    queryKey: ["leads", userId, { status }],
    queryFn: async () => {
      const data = await listLeads(userId!, status);
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
