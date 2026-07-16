import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import Seo from "./Seo";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import CountryCard from "./CountryCard";
import EnquiryForm from "./EnquiryForm";
import { countriesByService, type ServiceKey } from "@/data/countries";
import { breadcrumbJsonLd, type Crumb } from "./Breadcrumbs";
import { site, whatsappLink } from "@/config/site";

/** Generic hub: renders every country card for a service. One component, three pages. */
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
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Book Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink(`Hi Flyworld India, I'd like to know about ${title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </PageHero>

      <div className="container section">
        {intro && (
          <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted">{intro}</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {countries.map((c, i) => (
            <Reveal key={`${c.service}-${c.slug}`} delay={i * 60}>
              <CountryCard country={c} />
            </Reveal>
          ))}
        </div>
      </div>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="container grid gap-8 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Not sure which is right for you?</h2>
            <p className="mt-4 max-w-md text-muted">
              Tell us your goal, budget and timeline. We'll give you an honest
              view of your options — with no pressure to commit.
            </p>
          </div>
          <EnquiryForm defaultService={title} sourcePage={path} />
        </div>
      </section>
    </>
  );
}
