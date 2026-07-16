import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, HeartHandshake, Eye, Target } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import StatCounter from "@/components/shared/StatCounter";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { stats } from "@/data/content";
import { site } from "@/config/site";

const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: "About Us" }];

const values = [
  {
    icon: ShieldCheck,
    title: "Honesty over hype",
    body: "We tell you what's realistic — including when the answer is 'not yet' or 'not this route'. No guaranteed-visa promises, ever.",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "Clear, itemised costs and a documented process. You always know what you're paying for and what happens next.",
  },
  {
    icon: HeartHandshake,
    title: "People first",
    body: "Behind every application is a family making a huge decision. We treat it with the care it deserves.",
  },
  {
    icon: Target,
    title: "Accuracy",
    body: "Applications checked twice. Figures verified against official sources. Details are what get visas approved.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Flyworld India — Trusted Overseas Education & Immigration Consultants"
        description="Flyworld India is an Ahmedabad-based overseas education and immigration consultancy built on honesty and transparency. Learn our story, values and approach."
        path="/about"
        jsonLd={breadcrumbJsonLd(crumbs, site.url)}
      />

      <PageHero
        eyebrow="About Us"
        title="Trust, earned honestly"
        subtitle="Flyworld India helps students and families move abroad with confidence. We started with a simple belief: in an industry shadowed by scams, honesty is the strongest strategy."
        crumbs={crumbs}
      />

      <section className="container section">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <h2 className="text-3xl font-semibold text-ink">Our story</h2>
              <p>
                Based in Ahmedabad, Flyworld India began by guiding students toward
                Canada — and grew, with our clients, into a global mobility partner
                covering study abroad, Europe work permits, visitor visas and PR.
              </p>
              <p>
                Along the way, one thing stayed constant: the people who walk into
                our office are often anxious, sometimes on their second or third
                consultant, and always worried about two things — visa rejection and
                being scammed. Both fears are legitimate.
              </p>
              <p>
                So we built our practice around removing them. Real advice. Real
                costs. A real office you can visit. And the honesty to tell you when
                a plan won't work, before you spend money on it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card">
              <h3 className="text-lg font-semibold">Where we stand today</h3>
              <p className="mt-1 text-sm text-muted">
                Figures below are placeholders until verified with our records.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <StatCounter key={s.label} {...s} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <h2 className="text-3xl font-semibold">What we stand for</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="card flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold text-night">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="container flex flex-col items-center gap-5 py-14 text-center">
          <h2 className="text-3xl font-semibold">Meet the people behind Flyworld</h2>
          <p className="max-w-lg text-muted">
            Real faces, real expertise. Get to know the team who'll guide your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/team" className="btn-primary">
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
