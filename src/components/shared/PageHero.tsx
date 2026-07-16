import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/** Standard inner-page hero used by hubs and content pages. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-white/10">
      <div className="container py-12 lg:py-16">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
