// supabase/functions/submit-enquiry/index.ts
//
// Edge Function that receives enquiries. Runs on Supabase's infrastructure, not
// the website's origin, so form spikes never touch the static box (PRD §7.2).
//
// Responsibilities:
//   - CORS + JSON handling
//   - Honeypot + strict validation (name, Indian mobile, city, service)
//   - Server-side per-IP rate limiting (salted-hash key, atomic DB check)
//   - Insert via the SERVICE ROLE (bypasses RLS; the anon client can only INSERT
//     and never SELECT, so reads stay locked down)
//
// Secrets (set via `supabase secrets set`, NEVER in the browser / VITE_ vars):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (auto-provided), RATE_LIMIT_SALT
//
// Deploy: supabase functions deploy submit-enquiry --no-verify-jwt

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_SERVICES = [
  "Study Abroad",
  "Europe Work Permit",
  "Visitor Visa",
  "PR & Migration",
  "Not sure yet",
];

const MOBILE_RE = /^[6-9]\d{9}$/;

// Per-IP: at most 5 enquiries per 10 minutes.
const RATE_MAX = 5;
const RATE_WINDOW_SECONDS = 600;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot — bots fill this hidden field. Pretend success, insert nothing.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return json({ ok: true });
  }

  const name = String(payload.name ?? "").trim();
  const mobile = String(payload.mobile ?? "").replace(/\s+/g, "");
  const city = String(payload.city ?? "").trim();
  const service = String(payload.service ?? "").trim();
  const country = payload.country ? String(payload.country).trim() : null;
  const sourcePage = payload.source_page ? String(payload.source_page).slice(0, 200) : null;

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 120) errors.name = "Please enter your name.";
  if (!MOBILE_RE.test(mobile)) errors.mobile = "Enter a valid 10-digit Indian mobile.";
  if (!city || city.length > 120) errors.city = "Please enter your city.";
  if (!ALLOWED_SERVICES.includes(service)) errors.service = "Please choose a service.";
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const salt = Deno.env.get("RATE_LIMIT_SALT") ?? "flyworld-default-salt";
  const supabase = createClient(supabaseUrl, serviceKey);

  // Rate limit on a salted hash of the caller IP (no raw IP stored).
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  const keyHash = await sha256(`${salt}:${ip}`);

  const { data: allowed, error: rlError } = await supabase.rpc("check_rate_limit", {
    p_key_hash: keyHash,
    p_max_hits: RATE_MAX,
    p_window_seconds: RATE_WINDOW_SECONDS,
  });

  if (rlError) {
    // Fail OPEN on limiter errors — a lead is worth more than a strict limit,
    // and the DB's own constraints still protect data integrity.
    console.error("rate_limit rpc error", rlError.message);
  } else if (allowed === false) {
    return json(
      { ok: false, error: "You've sent a few enquiries already. Please try again shortly, or message us on WhatsApp." },
      429
    );
  }

  const { error: insertError } = await supabase.from("enquiries").insert({
    name,
    mobile,
    city,
    service,
    country,
    source_page: sourcePage,
    user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
  });

  if (insertError) {
    console.error("insert error", insertError.message);
    return json({ ok: false, error: "We couldn't save your enquiry. Please try WhatsApp." }, 500);
  }

  return json({ ok: true });
});
