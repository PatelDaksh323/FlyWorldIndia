import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Check,
  FileText,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import EnquiryForm from "@/components/shared/EnquiryForm";
import Faq from "@/components/shared/Faq";
import {
  getCountry,
  countryPath,
  serviceLabel,
  displayValue,
  type ServiceKey,
} from "@/data/countries";
import { site, whatsappLink, telLink } from "@/config/site";

const serviceHub: Record<ServiceKey, string> = {
  "study-abroad": "/study-abroad",
  "work-permit": "/europe-work-permit",
  "visitor-visa": "/visitor-visa",
};

/** ONE template → every country page (CLAUDE.md architecture). */
export default function CountryPage({ service }: { service: ServiceKey }) {
  const { slug = "" } = useParams();
  const country = getCountry(service, slug);

  // Unknown slug → send to the service hub rather than a dead end.
  if (!country) return <Navigate to={serviceHub[service]} replace />;

  const path = countryPath(country);
  const label = serviceLabel[service];

  const crumbs: Crumb[] = [
    { label: "Home", to: "/" },
    { label, to: serviceHub[service] },
    { label: country.name },
  ];

  // FAQPage structured data (PRD C-8) + breadcrumbs.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: country.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title={country.seoTitle}
        description={country.seoDescription}
        path={path}
        jsonLd={[faqJsonLd, breadcrumbJsonLd(crumbs, site.url)]}
      />

      {/* Hero (PRD C-1) */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="container py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-5xl" aria-hidden="true">
                  {country.flag}
                </span>
                <span className="chip !text-gold">{label}</span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                {country.headline}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                {country.subhead}
              </p>

              {/* 3 CTAs (PRD C-1) */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#enquire" className="btn-primary">
                  Book Free Consultation <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={whatsappLink(
                    `Hi Flyworld India, I'm interested in ${label} — ${country.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href={telLink()} className="btn-ghost">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            </div>

            {/* Quick facts (PRD C-2) */}
            <div className="grid grid-cols-2 gap-3">
              {country.quickFacts.map((f) => {
                const v = displayValue(f.value);
                return (
                  <div key={f.label} className="card !p-4">
                    <div className="text-xs uppercase tracking-wide text-muted">{f.label}</div>
                    <div className="mt-1.5 font-display text-lg font-semibold text-ink">
                      {v.text}
                    </div>
                    {v.unverified && (
                      <span className="mt-1 inline-block text-[10px] uppercase tracking-wide text-muted/70">
                        to be confirmed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* Main column */}
        <div className="space-y-14">
          {/* Why (PRD C-3) */}
          <Section id="why" icon={Sparkles} title={`Why ${country.name}?`}>
            <div className="grid gap-5 sm:grid-cols-1">
              {country.why.map((w) => (
                <Reveal key={w.title}>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-ink">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Offerings (PRD C-4) */}
          <Section id="courses" icon={GraduationIcon} title={country.offerings.heading}>
            <div className="flex flex-wrap gap-2.5">
              {country.offerings.items.map((c) => (
                <span key={c} className="chip text-sm">
                  {c}
                </span>
              ))}
            </div>
          </Section>

          {/* Eligibility (PRD C-5) */}
          <Section id="eligibility" icon={Check} title="Am I eligible?">
            <ul className="space-y-3">
              {country.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 text-sm text-ink/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {e}
                </li>
              ))}
            </ul>
          </Section>

          {/* Documents (PRD C-6) */}
          <Section id="documents" icon={FileText} title="Documents you'll need">
            <ul className="grid gap-3 sm:grid-cols-2">
              {country.documents.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-ink/90">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </Section>

          {/* Costs (PRD C-7) */}
          <Section id="costs" icon={CostIcon} title="Indicative costs">
            <div className="overflow-hidden rounded-xl2 border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Item</th>
                    <th className="px-4 py-3 font-medium">Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {country.costs.map((c) => (
                    <tr key={c.item} className="border-t border-white/10">
                      <td className="px-4 py-3">
                        <span className="text-ink">{c.item}</span>
                        {c.note && (
                          <span className="mt-0.5 block text-xs text-muted">{c.note}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gold">
                        {c.amount.startsWith("//") ? (
                          <span className="text-muted">To be confirmed</span>
                        ) : (
                          c.amount
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Figures are indicative and confirmed against official sources during
              your consultation. We never quote numbers we haven't verified.
            </p>
          </Section>

          {/* FAQs (PRD C-8) */}
          <Section id="faqs" icon={HelpCircle} title="Frequently asked questions">
            <Faq items={country.faqs} />
          </Section>
        </div>

        {/* Sticky enquiry sidebar (PRD C-9: service + country pre-filled) */}
        <aside className="lg:sticky lg:top-24 lg:h-fit" id="enquire">
          <EnquiryForm
            defaultService={label}
            defaultCountry={country.name}
            sourcePage={path}
          />
          <div className="card mt-4 text-center">
            <p className="text-sm text-muted">Prefer to talk to a person?</p>
            <a
              href={whatsappLink(`Hi Flyworld India, I have a question about ${label} — ${country.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-3 w-full"
            >
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </aside>
      </div>

      {/* Related destinations */}
      <RelatedCta service={service} label={label} currentSlug={country.slug} />
    </>
  );
}

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cta-gradient text-night">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function RelatedCta({
  service,
  label,
  currentSlug,
}: {
  service: ServiceKey;
  label: string;
  currentSlug: string;
}) {
  return (
    <section className="border-t border-white/10 bg-panel/40">
      <div className="container flex flex-col items-center gap-4 py-12 text-center">
        <h2 className="text-2xl font-semibold">Considering other options?</h2>
        <p className="max-w-lg text-sm text-muted">
          Every destination is different. Explore all {label} options, or tell us
          your goal and we'll point you the right way.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={serviceHub[service]} className="btn-ghost">
            All {label} destinations
          </Link>
          <a href="#enquire" className="btn-primary">
            Get free guidance <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <span className="sr-only">Currently viewing {currentSlug}</span>
      </div>
    </section>
  );
}

// Small inline icons to avoid extra imports where a generic mark suffices.
function GraduationIcon({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}
function CostIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}
