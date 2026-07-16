import { Link } from "react-router-dom";
import { ArrowRight, Quote, BadgeCheck } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { testimonials } from "@/data/content";
import { site } from "@/config/site";

const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: "Success Stories" }];

export default function SuccessStories() {
  return (
    <>
      <Seo
        title="Success Stories — Flyworld India Student & Visa Results"
        description="Real stories from students and families Flyworld India has helped move abroad. Honest testimonials, published only with permission."
        path="/success-stories"
        jsonLd={breadcrumbJsonLd(crumbs, site.url)}
      />

      <PageHero
        eyebrow="Success Stories"
        title="The people we've helped"
        subtitle="Short, real words from students and families. We only publish testimonials that are genuine and shared with permission — never invented."
        crumbs={crumbs}
      />

      <section className="container section">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 70}>
              <figure className="card flex h-full flex-col">
                <Quote className="h-8 w-8 text-gold/50" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="block text-xs text-muted">{t.detail}</span>
                  </div>
                  {t.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-gold">
                      <BadgeCheck className="h-4 w-4" /> Verified
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-xl2 border border-dashed border-white/15 bg-white/[0.02] p-6 text-center text-sm text-muted">
          More stories and video reviews are being added here as we collect
          permissions. The testimonials above are placeholders for layout and will
          be replaced with real, signed-off stories before launch.
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="container flex flex-col items-center gap-5 py-14 text-center">
          <h2 className="text-3xl font-semibold">Want to be our next success story?</h2>
          <Link to="/contact" className="btn-primary">
            Start your journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
