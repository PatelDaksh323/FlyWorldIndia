import { useRef, useState, type FormEvent } from "react";
import { MessageCircle, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase, enquiryFnUrl, supabaseAnonKey } from "@/lib/supabase";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/cn";

const SERVICES = [
  "Study Abroad",
  "Europe Work Permit",
  "Visitor Visa",
  "PR & Migration",
  "Not sure yet",
] as const;

type Props = {
  /** Pre-selected service (e.g. from a service/country page). */
  defaultService?: string;
  /** Pre-selected country, sent as context. */
  defaultCountry?: string;
  /** Which page this form sits on — recorded as source_page (PRD F-4). */
  sourcePage: string;
  className?: string;
  compact?: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

// Indian mobile: 10 digits, starts 6–9 (PRD F-2).
const MOBILE_RE = /^[6-9]\d{9}$/;

// Naive client-side rate limit (PRD F-7); the real limit lives in Supabase.
let lastSubmit = 0;

export default function EnquiryForm({
  defaultService = "",
  defaultCountry = "",
  sourcePage,
  className,
  compact = false,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const honeypot = useRef<HTMLInputElement>(null);

  const waMessage = `Hi Flyworld India, I'd like to enquire about ${
    defaultService || "your services"
  }${defaultCountry ? ` (${defaultCountry})` : ""}. My name is `;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — if filled, it's a bot. Silently succeed (PRD F-6).
    if (honeypot.current?.value) {
      setStatus("success");
      return;
    }

    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").trim().replace(/\s+/g, "");
    const city = String(data.get("city") || "").trim();
    const service = String(data.get("service") || "").trim();

    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = "Please enter your name.";
    if (!MOBILE_RE.test(mobile))
      errs.mobile = "Enter a 10-digit Indian mobile number starting 6–9.";
    if (!city) errs.city = "Please enter your city.";
    if (!service) errs.service = "Please choose a service.";
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    // Client-side throttle: one submit per 8s.
    const now = Date.now();
    if (now - lastSubmit < 8000) {
      setStatus("error");
      setError("You just sent an enquiry. Please wait a few seconds before trying again.");
      return;
    }

    setStatus("submitting");

    const record = {
      name,
      mobile,
      city,
      service,
      country: defaultCountry || null,
      source_page: sourcePage,
    };

    // Primary path: the Edge Function (server-side rate limiting + validation),
    // which runs on Supabase infra so form spikes never touch the origin.
    try {
      if (enquiryFnUrl && supabaseAnonKey) {
        const res = await fetch(enquiryFnUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ ...record, company: "" }),
        });

        if (res.ok) {
          lastSubmit = now;
          setStatus("success");
          form.reset();
          return;
        }

        if (res.status === 422) {
          const body = await res.json().catch(() => ({}));
          setFieldErrors(body.errors ?? {});
          setStatus("idle");
          return;
        }
        if (res.status === 429) {
          const body = await res.json().catch(() => ({}));
          setStatus("error");
          setError(body.error ?? "Too many enquiries just now. Please try again shortly.");
          return;
        }
        // Other statuses fall through to the direct-insert fallback below.
      }

      // Fallback: direct insert (RLS lets the public INSERT only, never SELECT).
      if (!supabase) throw new Error("Backend not configured");
      const { error: dbError } = await supabase.from("enquiries").insert(record);
      if (dbError) throw dbError;

      lastSubmit = now;
      setStatus("success");
      form.reset();
    } catch {
      // Never silently lose a lead (PRD F-5). Show WhatsApp fallback.
      setStatus("error");
      setError(
        "We couldn't submit your enquiry just now. Please message us on WhatsApp — we'll reply quickly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className={cn("card text-center", className)} role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h3 className="mt-4 text-xl font-semibold">Thank you — we've got your details.</h3>
        <p className="mt-2 text-sm text-muted">
          A Flyworld counsellor will call you back, usually within one working day.
          Prefer to talk now? Message us on WhatsApp.
        </p>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-5"
        >
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("card", className)}
      aria-label="Enquiry form"
    >
      {!compact && (
        <div className="mb-5">
          <h3 className="text-xl font-semibold">Book your free consultation</h3>
          <p className="mt-1 text-sm text-muted">
            Four fields, no obligation. We'll call you back.
          </p>
        </div>
      )}

      {/* Honeypot — hidden from humans, catches bots (PRD F-6). */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label>
          Do not fill this
          <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4">
        <Field label="Full name" error={fieldErrors.name}>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className="input"
            placeholder="Your name"
          />
        </Field>

        <Field label="Mobile number" error={fieldErrors.mobile}>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-white/15 bg-white/5 px-3 text-sm text-muted">
              +91
            </span>
            <input
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              maxLength={10}
              className="input rounded-l-none"
              placeholder="10-digit mobile"
            />
          </div>
        </Field>

        <Field label="City" error={fieldErrors.city}>
          <input
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            className="input"
            placeholder="e.g. Ahmedabad"
          />
        </Field>

        <Field label="Service" error={fieldErrors.service}>
          <select name="service" required defaultValue={defaultService} className="input">
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        {status === "error" && (
          <div
            className="flex items-start gap-2 rounded-lg border border-coral/40 bg-coral/10 p-3 text-sm text-ink"
            role="alert"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
            <div>
              <p>{error}</p>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 font-semibold text-gold underline"
              >
                <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
              </a>
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            "Request my callback"
          )}
        </button>

        <p className="text-center text-xs text-muted">
          By submitting, you agree to be contacted about your enquiry. We never
          share your details. Visa decisions rest with the authorities.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-coral" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
