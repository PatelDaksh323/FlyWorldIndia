-- 0002_rate_limit.sql
-- Server-side rate limiting for the enquiry endpoint (PRD F-7, §7.2).
--
-- The website is static behind a CDN, so page traffic ("10,000 clicks at once")
-- is absorbed at the edge and never touches an origin. The ONE dynamic path is
-- the enquiry form, which runs on Supabase infra via an Edge Function. This
-- migration gives that function a cheap, atomic per-key rate limiter so a burst
-- (or an abusive script) can't flood the enquiries table.

-- Ephemeral hit log. Stores only a SALTED HASH of the IP, never the raw IP,
-- so it holds no personal data. Rows are short-lived (cleaned below).
create table if not exists public.rate_limit_hits (
  id         bigint generated always as identity primary key,
  key_hash   text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_hits_key_time_idx
  on public.rate_limit_hits (key_hash, created_at desc);

alter table public.rate_limit_hits enable row level security;
-- No policies => only the service role (the Edge Function) can touch it.

-- Atomic check-and-record. Returns TRUE if the request is ALLOWED.
-- Counts hits for key_hash inside the window; if under the limit, records the
-- hit and allows. SECURITY DEFINER so the Edge Function can call it via RPC.
create or replace function public.check_rate_limit(
  p_key_hash text,
  p_max_hits int,
  p_window_seconds int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  hit_count int;
begin
  select count(*) into hit_count
  from public.rate_limit_hits
  where key_hash = p_key_hash
    and created_at > now() - make_interval(secs => p_window_seconds);

  if hit_count >= p_max_hits then
    return false;
  end if;

  insert into public.rate_limit_hits (key_hash) values (p_key_hash);
  return true;
end;
$$;

-- Best-effort cleanup of old rows (call from the Edge Function occasionally, or
-- schedule via pg_cron if available).
create or replace function public.prune_rate_limit_hits()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.rate_limit_hits where created_at < now() - interval '1 hour';
$$;

-- Optional: if the pg_cron extension is enabled, prune every 15 minutes.
-- select cron.schedule('prune-rate-limit', '*/15 * * * *', 'select public.prune_rate_limit_hits()');
