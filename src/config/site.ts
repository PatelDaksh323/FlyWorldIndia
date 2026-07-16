/**
 * Single source of truth for business-wide constants.
 *
 * Contact details fall back to env vars (VITE_* — public, safe to bundle) and
 * then to placeholders. The placeholders below are INVENTED and MUST be
 * replaced with real values from Rahul before launch. Search for "// VERIFY".
 */

const env = import.meta.env;

export const site = {
  name: "Flyworld India",
  legalName: "Flyworld India",
  tagline: "Your Global Mobility Partner",
  description:
    "Overseas education & immigration consultancy in Ahmedabad. Study Abroad, Europe Work Permits, Visitor Visas and PR — honest guidance for a life-changing decision.",
  url: "https://www.flyworldindia.com",

  // Contact — // VERIFY: replace placeholders with real values before launch.
  whatsapp: (env.VITE_WHATSAPP_NUMBER as string) || "919999999999", // VERIFY
  phone: (env.VITE_PHONE_NUMBER as string) || "+919999999999", // VERIFY
  email: (env.VITE_CONTACT_EMAIL as string) || "info@flyworldindia.com", // VERIFY
  address: {
    line: "Ahmedabad, Gujarat, India", // VERIFY: full office address
    city: "Ahmedabad",
    hours: "Mon–Sat, 10:00 AM – 7:00 PM", // VERIFY
  },

  social: {
    // VERIFY real handles before launch
    instagram: "https://instagram.com/flyworldindia",
    facebook: "https://facebook.com/flyworldindia",
  },
} as const;

/** Prebuilt WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Prebuilt tel: link. */
export function telLink(): string {
  return `tel:${site.phone.replace(/\s+/g, "")}`;
}
