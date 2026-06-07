import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, upsertProfile } from "@/lib/api/profile.functions";
import type { ProfileUpdate } from "@/lib/db/schemas";

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpsertProfile(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates: ProfileUpdate) => upsertProfile(userId, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });
}
