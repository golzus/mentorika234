-- Adds a free-text "next task" field to leads, shown in the lead detail card.
alter table public.leads
  add column if not exists next_task text;
