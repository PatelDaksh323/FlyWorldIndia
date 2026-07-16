import { ArrowRight, Check, ClipboardList, Compass, FileCheck2 } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import EnquiryForm from "@/components/shared/EnquiryForm";
import Faq from "@/components/shared/Faq";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { site } from "@/config/site";

const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: "PR & Migration" }];

const steps = [
  {
    icon: ClipboardList,
    title: "Free points assessment",
    body: "We evaluate your age, education, work experience and language scores against the destination's points system — honestly.",
  },
  {
    icon: Compass,
    title: "Profile improvement plan",
    body: "If you're short on points, we show you exactly what would move the needle: a language retake, an ECA, added experience.",
  },
  {
    icon: FileCheck2,
    title: "End-to-end filing",
    body: "When you're ready, we prepare and file your expression of interest and application accurately and on time.",
  },
];

const faqs = [
  {
    q: "Can you guarantee PR?",
    a: "No genuine consultant can guarantee permanent residency — the decision rests with the destination's immigration authority. What we guarantee is honest assessment and careful, accurate filing.",
  },
  {
    q: "Which countries do you help with for PR?",
    a: "We focus on established points-based systems such as Canada and Australia, and advise on European long-term residence routes. Your free assessment identifies the best fit for your profile.",
  },
  {
    q: "How long does PR take?",
    a: "Timelines vary widely by country, category and your profile. We give you a realistic estimate based on current official processing information — never an inflated promise.",
  },
];

export default function PRMigration() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title="PR & Migration Consultants from India — Canada, Australia PR | Flyworld India"
        description="Permanent residency and migration guidance from India. Free points assessment, honest profile advice and accurate filing for Canada, Australia and more."
        path="/pr-migration"
        jsonLd={[faqJsonLd, breadcrumbJsonLd(crumbs, site.url)]}
      />

      <PageHero
        eyebrow="PR & Migration"
        title="Permanent residency, assessed honestly"
        subtitle="PR is a long game, and false hope is expensive. We start with a free, realistic assessment of where you actually stand — then build a plan from there."
        crumbs={crumbs}
      >
        <div className="mt-7">
          <a href="#assess" className="btn-primary">
            Get your free assessment <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      <section className="container section">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-night">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-8">
        <div className="card">
          <h2 className="text-2xl font-semibold">What a strong PR profile usually needs</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Competitive language scores (IELTS/PTE/CELPIP)",
              "Educational Credential Assessment (ECA)",
              "Relevant, documented work experience",
              "Age and adaptability factors understood",
              "Proof of funds for settlement",
              "A clean, well-organised document set",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3 text-sm text-ink/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Exact requirements depend on the destination and category, and are
            confirmed against official sources during your assessment.
          </p>
        </div>
      </section>

      <section id="assess" className="container section scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold">Start with an honest assessment</h2>
            <p className="mt-4 max-w-md text-muted">
              Share a few details and a counsellor will call you back to talk
              through your realistic PR options. No pressure, no false promises.
            </p>
            <div className="mt-8">
              <Faq items={faqs} />
            </div>
          </div>
          <EnquiryForm defaultService="PR & Migration" sourcePage="/pr-migration" />
        </div>
      </section>
    </>
  );
}
