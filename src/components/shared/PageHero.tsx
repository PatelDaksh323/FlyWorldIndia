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
      <div className="container pb-12 pt-8 lg:pb-16 lg:pt-10">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-8 max-w-3xl">
          {eyebrow && <p className="label">{eyebrow}</p>}
          <h1 className="mt-5 text-display">{title}</h1>
          {subtitle && <p className="prose-narrow mt-6">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
