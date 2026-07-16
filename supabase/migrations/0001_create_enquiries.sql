-- 0001_create_enquiries.sql
-- Enquiries table + Row Level Security.
--
-- ⚠ SECURITY-CRITICAL (CLAUDE.md risk #3, PRD 7.4):
-- The anon key ships in public browser JS. Without the policies below, ANYONE
-- could read every customer's name and phone number. The rule is:
--   * Public (anon) may INSERT an enquiry.
--   * Public (anon) may NEVER SELECT / UPDATE / DELETE.
-- Only the service role (server-side, e.g. an Edge Function or the dashboard)
-- can read enquiries.

create extension if not exists "pgcrypto";

create table if not exists public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null check (char_length(name) between 2 and 120),
  mobile       text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  city         text not null check (char_length(city) between 1 and 120),
  service      text not null check (char_length(service) between 1 and 80),
  country      text,
  source_page  text,
  -- lightweight anti-abuse metadata (optional; filled server-side if used)
  user_agent   text,
  status       text not null default 'new'
                 check (status in ('new', 'contacted', 'closed', 'spam'))
);

comment on table public.enquiries is
  'Lead-capture enquiries from the website. Public may INSERT only; reads are service-role only.';

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_source_page_idx on public.enquiries (source_page);

-- Enable RLS. With RLS on and no permissive SELECT policy, anon cannot read.
alter table public.enquiries enable row level security;

-- Public may INSERT new enquiries (the website form).
drop policy if exists "anon can insert enquiries" on public.enquiries;
create policy "anon can insert enquiries"
  on public.enquiries
  for insert
  to anon
  with check (true);

-- NOTE: There is deliberately NO select/update/delete policy for anon.
-- The service role bypasses RLS, so counsellors read enquiries via the
-- Supabase dashboard or a server-side function using the service-role key
-- (which must NEVER be exposed to the browser / VITE_ vars).

-- ---------------------------------------------------------------------------
-- Verification snippet — run in the SQL editor BEFORE launch (PRD risk #3):
--
--   -- As the anon role, this MUST return 0 rows / permission denied:
--   set role anon;
--   select * from public.enquiries;      -- expect: permission denied / no rows
--   -- And this MUST succeed:
--   insert into public.enquiries (name, mobile, city, service)
--   values ('Test', '9876543210', 'Ahmedabad', 'Study Abroad');
--   reset role;
-- ---------------------------------------------------------------------------
