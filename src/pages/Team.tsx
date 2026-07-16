import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { site } from "@/config/site";

const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: "Our Team" }];

/**
 * ⚠ Team members are PLACEHOLDERS. Per CLAUDE.md pre-flight, replace with real
 * names, roles and photos (a good phone photo beats stock). Marked // VERIFY.
 */
type Member = { name: string; role: string; bio: string; initials: string };

const team: Member[] = [
  {
    name: "Rahul Patel", // VERIFY
    role: "Founder & Principal Consultant",
    bio: "Leads Flyworld with a simple rule: give every family the honest advice we'd want for our own.",
    initials: "RP",
  },
  {
    name: "Counsellor Name", // VERIFY
    role: "Senior Study Abroad Counsellor",
    bio: "Guides students through university selection, applications and student visas across Europe and beyond.",
    initials: "SC",
  },
  {
    name: "Counsellor Name", // VERIFY
    role: "Work Permit & PR Specialist",
    bio: "Handles eligibility assessments and documentation for Europe work permits and PR pathways.",
    initials: "WP",
  },
  {
    name: "Counsellor Name", // VERIFY
    role: "Visa Documentation Lead",
    bio: "Makes sure every application is complete, consistent and filed right the first time.",
    initials: "VD",
  },
];

export default function Team() {
  return (
    <>
      <Seo
        title="Our Team — Flyworld India Consultants in Ahmedabad"
        description="Meet the Flyworld India team — real people, real expertise in study abroad, work permits, visitor visas and PR. Book a consultation with a counsellor."
        path="/team"
        jsonLd={breadcrumbJsonLd(crumbs, site.url)}
      />

      <PageHero
        eyebrow="Our Team"
        title="Real people, real expertise"
        subtitle="The counsellors who'll guide you — and yes, you can meet them at our office. In this business, seeing real faces matters."
        crumbs={crumbs}
      />

      <section className="container section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="card h-full text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cta-gradient font-display text-2xl font-semibold text-night">
                  {m.initials}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-gold">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          Team details shown are placeholders and will be updated with real names
          and photographs before launch.
        </p>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="container flex flex-col items-center gap-5 py-14 text-center">
          <h2 className="text-3xl font-semibold">Come and say hello</h2>
          <p className="max-w-lg text-muted">
            Book a free consultation, or drop by our Ahmedabad office. We'd love to
            help you plan your next step.
          </p>
          <Link to="/contact" className="btn-primary">
            Book a consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
