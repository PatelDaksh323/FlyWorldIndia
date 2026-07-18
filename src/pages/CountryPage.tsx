import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle, Check } from "lucide-react";
import Seo from "@/components/shared/Seo";
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
  if (!country) return <Navigate to={serviceHub[service]} replace />;

  const path = countryPath(country);
  const label = serviceLabel[service];
  const crumbs: Crumb[] = [
    { label: "Home", to: "/" },
    { label, to: serviceHub[service] },
    { label: country.name },
  ];

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

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="container pb-10 pt-8 lg:pb-14 lg:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">
              {country.flag}
            </span>
            <span className="label">{label}</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-display">{country.headline}</h1>
          <p className="prose-narrow mt-6">{country.subhead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#enquire" className="btn-primary">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink(`Hi Flyworld India, I'm interested in ${label} — ${country.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
            >
              WhatsApp
            </a>
            <a href={telLink()} className="text-sm text-muted transition-colors hover:text-ink">
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Quick-facts band (PRD C-2) — bordered strip, not chips */}
      <section className="border-b border-white/10 bg-panel/40">
        <div className="container">
          <dl className="grid grid-cols-2 divide-white/10 py-8 md:grid-cols-4 md:divide-x">
            {country.quickFacts.map((f, i) => {
              const v = displayValue(f.value);
              return (
                <div key={f.label} className={i % 2 === 1 ? "pl-5 md:px-6" : "pr-5 md:px-6"}>
                  <dt className="label">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg text-ink">{v.text}</dd>
                  {v.unverified && (
                    <dd className="mt-1 text-[11px] uppercase tracking-wide text-muted/70">
                      to be confirmed
                    </dd>
                  )}
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Body: content + sticky conversion form */}
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-16 lg:col-span-7">
          {/* Why (PRD C-3) — editorial list, hairline rules */}
          <Block index="01" title={`Why ${country.name}`}>
            <div className="border-t border-white/10">
              {country.why.map((w) => (
                <div key={w.title} className="border-b border-white/10 py-6">
                  <h3 className="font-display text-lg text-ink">{w.title}</h3>
                  <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </Block>

          {/* Offerings (PRD C-4) */}
          <Block index="02" title={country.offerings.heading}>
            <ul className="flex flex-wrap gap-2.5">
              {country.offerings.items.map((c) => (
                <li key={c} className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </Block>

          {/* Eligibility (PRD C-5) */}
          <Block index="03" title="Am I eligible?">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {country.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 py-3.5 text-[15px] text-ink/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {e}
                </li>
              ))}
            </ul>
          </Block>

          {/* Documents (PRD C-6) */}
          <Block index="04" title="Documents you'll need">
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {country.documents.map((d) => (
                <li key={d} className="flex items-start gap-3 border-b border-white/10 pb-3 text-[15px] text-ink/90">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </Block>

          {/* Costs (PRD C-7) — itemised table, the transparency signal */}
          <Block index="05" title="Indicative costs">
            <div className="overflow-hidden rounded-xl2 border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-3.5 font-medium">Item</th>
                    <th className="px-5 py-3.5 font-medium">Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {country.costs.map((c) => (
                    <tr key={c.item} className="border-t border-white/10">
                      <td className="px-5 py-3.5">
                        <span className="text-ink">{c.item}</span>
                        {c.note && <span className="mt-0.5 block text-xs text-muted">{c.note}</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        {c.amount.startsWith("//") ? (
                          <span className="text-muted">To be confirmed</span>
                        ) : (
                          <span className="text-ink">{c.amount}</span>
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
          </Block>

          {/* FAQs (PRD C-8) */}
          <Block index="06" title="Common questions">
            <Faq items={country.faqs} />
          </Block>
        </div>

        {/* Sticky enquiry (PRD C-9) */}
        <aside className="lg:col-span-5" id="enquire">
          <div className="lg:sticky lg:top-24">
            <EnquiryForm defaultService={label} defaultCountry={country.name} sourcePage={path} />
            <div className="mt-4 rounded-lg border border-white/10 p-5 text-center">
              <p className="text-sm text-muted">Prefer to speak to a person?</p>
              <a
                href={whatsappLink(`Hi Flyworld India, I have a question about ${label} — ${country.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-3 w-full"
              >
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
              <a href={telLink()} className="mt-3 flex items-center justify-center gap-2 text-sm text-muted hover:text-ink">
                <Phone className="h-4 w-4 text-gold" /> {site.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="border-t border-white/10 bg-panel/40">
        <div className="container flex flex-col items-start gap-5 py-14">
          <h2 className="text-title">Considering other options?</h2>
          <p className="max-w-prose text-muted">
            Every destination is different. Explore all {label} options, or tell us
            your goal and we'll point you the right way.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={serviceHub[service]} className="btn-ghost">
              All {label} destinations
            </Link>
            <a href="#enquire" className="btn-link">
              Get free guidance <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* Editorial section block: number + caption label, heading, content. */
function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm text-gold">{index}</span>
        <h2 className="text-title">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
