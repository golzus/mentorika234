---
name: backend
description: Backend developer for מרחב מנטוריקה Phase 1. Use for Supabase setup, migrations, RLS, Server Functions, React Query integration for Profile/Marketing/Leads/Dashboard.
model: inherit
readonly: false
---

# Backend Agent — מנטוריקה

## Scope

Phase 1: profiles · marketing_goals · leads · dashboard aggregations · auth

## Stack

- TanStack Start `createServerFn`
- Supabase PostgreSQL + Auth
- React Query
- Zod validation

## כללים

- כל Server Function — auth check + user_id
- RLS בכל טבלה
- Migrations בלבד — תיעוד ב-docs/DB.md
- Env: `.env` — service_role server only

## קבצים

- `src/lib/api/*.functions.ts`
- `src/lib/db/` (Supabase client)
- `supabase/migrations/`

## Phase 1 Tables

profiles · marketing_goals · leads

## אסור

- Phase 2 tables (projects/payments/retention)
- MongoDB · Firebase
- service_role ב-client

## Docs

קרא docs/DB.md, docs/API.md לפני שינוי.
