import { Link } from "react-router-dom";
import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { posts } from "@/data/blog";
import { site } from "@/config/site";

const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: "Blog" }];

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog — Study Abroad, Work Permit & Visa Guides | Flyworld India"
        description="Honest, up-to-date guides on studying abroad, Europe work permits, visitor visas and PR — from the Flyworld India team."
        path="/blog"
        jsonLd={breadcrumbJsonLd(crumbs, site.url)}
      />

      <PageHero
        eyebrow="Blog"
        title="Guidance worth reading"
        subtitle="Practical, honest articles on studying and working abroad. No fluff, no scare tactics — just useful guidance."
        crumbs={crumbs}
      />

      <section className="container section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link
                to={`/blog/${p.slug}`}
                className="card group flex h-full flex-col transition-colors hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <span className="chip !text-gold">{p.category}</span>
                  <span className="text-xs text-muted">{p.readMins} min read</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug group-hover:text-gold">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <span className="mt-4 text-xs text-muted">{formatDate(p.date)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

/** Format an ISO date without constructing a runtime Date at render time. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`;
}
