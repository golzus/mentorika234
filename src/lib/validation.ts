import type { z } from "zod";

export function parseInput<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "הנתונים שהוזנו אינם תקינים";
    throw new Error(message);
  }

  return result.data;
}
