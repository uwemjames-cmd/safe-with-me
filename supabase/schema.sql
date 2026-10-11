-- Safe to run more than once. Paste all of it into the Supabase SQL editor and press Run.
create table if not exists profiles(id uuid primary key references auth.users on delete cascade, display_name text);
alter table profiles add column if not exists vault_salt text;
alter table profiles add column if not exists vault_check text;
create table if not exists protect_progress(user_id uuid references auth.users on delete cascade, item_id text, done_at timestamptz default now(), primary key(user_id,item_id));
create table if not exists reflections(id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users on delete cascade, prompt text, body text not null, created_at timestamptz default now());
create table if not exists tasks(id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users on delete cascade, title text not null, priority int default 2, day date default current_date, done boolean default false);
alter table profiles enable row level security;
alter table protect_progress enable row level security;
alter table reflections enable row level security;
alter table tasks enable row level security;
drop policy if exists "own profile" on profiles; create policy "own profile" on profiles for all to authenticated using (id=auth.uid()) with check (id=auth.uid());
drop policy if exists "own progress" on protect_progress; create policy "own progress" on protect_progress for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists "own reflections" on reflections; create policy "own reflections" on reflections for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists "own tasks" on tasks; create policy "own tasks" on tasks for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create or replace function public.vault_exists() returns boolean language sql security definer set search_path=public as $$ select exists(select 1 from public.profiles where vault_salt is not null) $$;
grant execute on function public.vault_exists() to anon, authenticated;
