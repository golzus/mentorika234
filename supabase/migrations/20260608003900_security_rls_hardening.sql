-- Security hardening applied on 2026-06-08.
-- Keep trigger-only helper functions off the public RPC surface.

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

alter function public.handle_updated_at() set search_path = public;

-- RLS policies use `(select auth.uid())` so Supabase/Postgres can evaluate
-- the JWT user once per statement instead of once per row.

drop policy if exists "profiles: user can view own" on public.profiles;
drop policy if exists "profiles: user can insert own" on public.profiles;
drop policy if exists "profiles: user can update own" on public.profiles;

create policy "profiles: user can view own"
on public.profiles
for select
using ((select auth.uid()) = id);

create policy "profiles: user can insert own"
on public.profiles
for insert
with check ((select auth.uid()) = id);

create policy "profiles: user can update own"
on public.profiles
for update
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "leads: user can view own" on public.leads;
drop policy if exists "leads: user can insert own" on public.leads;
drop policy if exists "leads: user can update own" on public.leads;
drop policy if exists "leads: user can delete own" on public.leads;

create policy "leads: user can view own"
on public.leads
for select
using ((select auth.uid()) = user_id);

create policy "leads: user can insert own"
on public.leads
for insert
with check ((select auth.uid()) = user_id);

create policy "leads: user can update own"
on public.leads
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "leads: user can delete own"
on public.leads
for delete
using ((select auth.uid()) = user_id);

drop policy if exists "marketing_goals: user can view own" on public.marketing_goals;
drop policy if exists "marketing_goals: user can insert own" on public.marketing_goals;
drop policy if exists "marketing_goals: user can update own" on public.marketing_goals;
drop policy if exists "marketing_goals: user can delete own" on public.marketing_goals;

create policy "marketing_goals: user can view own"
on public.marketing_goals
for select
using ((select auth.uid()) = user_id);

create policy "marketing_goals: user can insert own"
on public.marketing_goals
for insert
with check ((select auth.uid()) = user_id);

create policy "marketing_goals: user can update own"
on public.marketing_goals
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "marketing_goals: user can delete own"
on public.marketing_goals
for delete
using ((select auth.uid()) = user_id);
