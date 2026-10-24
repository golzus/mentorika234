import { z } from "zod";

// ─── GoldenCircle ────────────────────────────────────────────────────────────

export const goldenCircleSchema = z.object({
  why: z.string().optional(),
  affinity: z.string().optional(),
  flagship_product: z.string().optional(),
  target_audience: z.string().optional(),
  vision: z.string().optional(),
});

export type GoldenCircle = z.infer<typeof goldenCircleSchema>;

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profileSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  business_field: z.string().nullable().optional(),
  business_name: z.string().nullable().optional(),
  slogan: z.string().nullable().optional(),
  golden_circle: goldenCircleSchema.nullable().optional(),
  monthly_salary_target: z.number().nullable().optional(),
  new_clients_target: z.number().int().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const profileUpdateSchema = z.object({
  first_name: z.string().min(1, "שם פרטי נדרש").optional(),
  last_name: z.string().optional(),
  business_field: z.string().optional(),
  business_name: z.string().optional(),
  slogan: z.string().optional(),
  golden_circle: goldenCircleSchema.optional(),
  monthly_salary_target: z.number().nonnegative().optional(),
  new_clients_target: z.number().int().nonnegative().optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;

// ─── MarketingGoal ───────────────────────────────────────────────────────────

export const marketingCategorySchema = z.enum([
  "מכירות",
  "חשיפה",
  'שתפ"ם',
  "שימור",
  "המלצות",
  "בניית תשתיות",
]);

export type MarketingCategory = z.infer<typeof marketingCategorySchema>;

export const actionItemSchema = z.object({
  text: z.string(),
  done: z.boolean().default(false),
});

export type ActionItem = z.infer<typeof actionItemSchema>;

export const marketingGoalSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  category: marketingCategorySchema,
  title: z.string(),
  description: z.string().nullable().optional(),
  measurable_target: z.string().nullable().optional(),
  target_date: z.string().nullable().optional(),
  actions: z.array(actionItemSchema).nullable().optional(),
  weekly_task: z.string().nullable().optional(),
  status: z.enum(["active", "completed"]).default("active"),
  created_at: z.string(),
  updated_at: z.string(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});

export const marketingGoalInsertSchema = z.object({
  category: marketingCategorySchema,
  title: z.string().min(1, "כותרת נדרשת"),
  description: z.string().optional(),
  measurable_target: z.string().optional(),
  target_date: z.string().optional(),
  actions: z.array(actionItemSchema).optional().default([]),
  weekly_task: z.string().optional(),
  status: z.enum(["active", "completed"]).default("active"),
});

export const marketingGoalUpdateSchema = marketingGoalInsertSchema.partial();

export type MarketingGoal = z.infer<typeof marketingGoalSchema>;
export type MarketingGoalInsert = z.infer<typeof marketingGoalInsertSchema>;
export type MarketingGoalUpdate = z.infer<typeof marketingGoalUpdateSchema>;

// ─── Lead ────────────────────────────────────────────────────────────────────

export const leadStatusSchema = z.enum(["new", "in_progress", "closed"]);

export type LeadStatus = z.infer<typeof leadStatusSchema>;

export const leadSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  source: z.string().nullable().optional(),
  interested_in: z.string().nullable().optional(),
  proposed_price: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  next_task: z.string().nullable().optional(),
  status: leadStatusSchema.default("new"),
  created_at: z.string(),
  updated_at: z.string(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});

export const leadInsertSchema = z.object({
  name: z.string().min(1, "שם ליד נדרש"),
  phone: z.string().optional(),
  email: z.string().email("מייל לא תקין").optional().or(z.literal("")),
  source: z.string().optional(),
  interested_in: z.string().optional(),
  proposed_price: z.string().optional(),
  notes: z.string().optional(),
  next_task: z.string().optional(),
  status: leadStatusSchema.default("new"),
});

export const leadUpdateSchema = leadInsertSchema.partial();

export type Lead = z.infer<typeof leadSchema>;
export type LeadInsert = z.infer<typeof leadInsertSchema>;
export type LeadUpdate = z.infer<typeof leadUpdateSchema>;
