import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import Seo from "./Seo";
import PageHero from "./PageHero";
import EnquiryForm from "./EnquiryForm";
import { countriesByService, countryPath, displayValue, type ServiceKey } from "@/data/countries";
import { breadcrumbJsonLd, type Crumb } from "./Breadcrumbs";
import { site, whatsappLink } from "@/config/site";

/** Generic hub: an editorial index of destinations for a service. */
export default function ServiceHub({
  service,
  eyebrow,
  title,
  subtitle,
  path,
  intro,
  seoTitle,
  seoDescription,
}: {
  service: ServiceKey;
  eyebrow: string;
  title: string;
  subtitle: string;
  path: string;
  intro?: string;
  seoTitle: string;
  seoDescription: string;
}) {
  const countries = countriesByService(service);
  const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: title }];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        jsonLd={breadcrumbJsonLd(crumbs, site.url)}
      />

      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} crumbs={crumbs}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to="/contact" className="btn-primary">
            Book a consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink(`Hi Flyworld India, I'd like to know about ${title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
          >
            WhatsApp us
          </a>
        </div>
      </PageHero>

      <section className="container section">
        {intro && <p className="prose-narrow mb-12 max-w-2xl">{intro}</p>}

        {/* Destination index — rows with hairline rules, not a card grid. */}
        <div className="border-t border-white/10">
          {countries.map((c) => (
            <Link
              key={`${c.service}-${c.slug}`}
              to={countryPath(c)}
              className="group grid grid-cols-1 gap-x-8 gap-y-3 border-b border-white/10 py-8 md:grid-cols-12 md:items-baseline"
            >
              <div className="flex items-center gap-3 md:col-span-3">
                <span className="text-xl" aria-hidden="true">{c.flag}</span>
                <span className="font-display text-xl text-ink transition-colors group-hover:text-gold">
                  {c.name}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-muted md:col-span-6">{c.subhead}</p>
              <div className="flex items-center justify-between md:col-span-3 md:justify-end md:gap-6">
                <span className="text-sm text-muted">
                  {c.quickFacts[0]?.label}:{" "}
                  <span className="text-ink">{displayValue(c.quickFacts[0]?.value ?? "").text}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-gold" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-display">Not sure which fits?</h2>
            <p className="prose-narrow mt-6">
              Tell us your goal, budget and timeline. We'll give you an honest read
              on your options — with no pressure to commit.
            </p>
            <a
              href={whatsappLink(`Hi Flyworld India, I'd like guidance on ${title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link mt-6"
            >
              <MessageCircle className="h-4 w-4" /> Or message us on WhatsApp
            </a>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm defaultService={title} sourcePage={path} />
          </div>
        </div>
      </section>
    </>
  );
}
