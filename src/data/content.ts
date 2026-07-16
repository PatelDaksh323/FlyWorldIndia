/**
 * Homepage + global marketing content.
 *
 * ⚠ The stats below are INVENTED PLACEHOLDERS (CLAUDE.md pre-flight #3).
 * Replace with real, verified figures from Rahul before launch. Broken/fake
 * numbers are worse than none — the old site's "0%" is exactly what we're
 * fixing. Every unverified figure is marked // VERIFY.
 */

import { GraduationCap, Briefcase, Plane, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Stat = { value: number; suffix?: string; prefix?: string; label: string };

export const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Years of experience" }, // VERIFY
  { value: 8000, suffix: "+", label: "Students & families guided" }, // VERIFY
  { value: 20, suffix: "+", label: "Countries covered" }, // VERIFY
  { value: 50, suffix: "+", label: "University & partner tie-ups" }, // VERIFY
];

export type Service = {
  title: string;
  blurb: string;
  to: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Study Abroad",
    blurb:
      "Bachelor's, Master's and diplomas across Germany, Canada, the UK, Australia, Ireland, the USA and France — matched to your budget and goals.",
    to: "/study-abroad",
    icon: GraduationCap,
    points: ["University shortlisting", "SOP & application", "Student visa filing"],
  },
  {
    title: "Europe Work Permit",
    blurb:
      "Skilled and semi-skilled work routes to Germany, Poland, Croatia, Hungary and Romania — with honest eligibility checks first.",
    to: "/europe-work-permit",
    icon: Briefcase,
    points: ["Eligibility assessment", "Employer & contract review", "Work visa filing"],
  },
  {
    title: "Visitor Visa",
    blurb:
      "Tourist and family-visit visas for the UK, Schengen, USA, Australia and Dubai — documentation done right the first time.",
    to: "/visitor-visa",
    icon: Plane,
    points: ["Document checklist", "Financial proof guidance", "Interview prep"],
  },
  {
    title: "PR & Migration",
    blurb:
      "Permanent residency and long-term migration pathways, starting with a free assessment of where you actually stand.",
    to: "/pr-migration",
    icon: BadgeCheck,
    points: ["Points-based assessment", "Profile improvement plan", "End-to-end filing"],
  },
];

export type Step = { title: string; body: string };

export const steps: Step[] = [
  {
    title: "Free consultation",
    body: "Tell us your goal, budget and timeline. We tell you honestly what's realistic — no pressure, no false promises.",
  },
  {
    title: "Personalised plan",
    body: "A clear roadmap: the right country, course or route, the documents you'll need, and the real costs involved.",
  },
  {
    title: "Application & filing",
    body: "We prepare your applications, SOPs and visa file with you — accurate, complete and on time.",
  },
  {
    title: "Fly with confidence",
    body: "Pre-departure guidance, and we stay reachable after you land. Your success is the testimonial we want.",
  },
];

/**
 * ⚠ Testimonials are PLACEHOLDERS for layout only. Per CLAUDE.md, no
 * testimonial ships unless it is real and signed off. Replace before launch.
 */
export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They were upfront about my chances instead of just taking my money. That honesty is exactly why I trusted them with my Germany application.",
    name: "Placeholder Name", // VERIFY — real, signed-off testimonial
    detail: "MS in Germany",
    verified: false,
  },
  {
    quote:
      "Every document was checked twice. My Canada study visa came through without a single query. Worth every rupee.",
    name: "Placeholder Name", // VERIFY
    detail: "Study visa — Canada",
    verified: false,
  },
  {
    quote:
      "As parents, we were scared of scams. Meeting the team at their office and seeing past students put us at ease.",
    name: "Placeholder Name", // VERIFY
    detail: "Parent of UK student",
    verified: false,
  },
];

export const destinationChips: { label: string; to: string }[] = [
  { label: "🇩🇪 Germany", to: "/study-abroad/germany" },
  { label: "🇨🇦 Canada", to: "/study-abroad/canada" },
  { label: "🇬🇧 United Kingdom", to: "/study-abroad/uk" },
  { label: "🇦🇺 Australia", to: "/study-abroad/australia" },
  { label: "🇮🇪 Ireland", to: "/study-abroad/ireland" },
  { label: "🇺🇸 USA", to: "/study-abroad/usa" },
  { label: "🇫🇷 France", to: "/study-abroad/france" },
];
