import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase browser client. The anon key is PUBLIC by design and safe to ship
 * in browser JS — access is controlled by Row Level Security (public may
 * INSERT into `enquiries`, never SELECT). See
 * supabase/migrations/0001_create_enquiries.sql.
 *
 * If env vars are missing (e.g. local dev without a project), we expose `null`
 * so the EnquiryForm can degrade gracefully to its WhatsApp fallback instead
 * of throwing.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const supabaseReady = Boolean(supabase);

/** Endpoint for the submit-enquiry Edge Function (server-side rate limiting). */
export const enquiryFnUrl = url ? `${url}/functions/v1/submit-enquiry` : null;
export const supabaseAnonKey = anonKey ?? null;
