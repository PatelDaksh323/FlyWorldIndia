import type { ReactNode } from "react";

type Tag = "div" | "section" | "li" | "article" | "span";

/**
 * Content wrapper. Deliberately a plain pass-through: content is ALWAYS
 * rendered and visible — no scroll-gated opacity that can leave sections blank
 * for prerender/SEO, no-JS, or full-page capture. Restraint over choreography.
 *
 * Kept as a component (rather than deleting call sites) so section markup stays
 * declarative and we can reintroduce a subtle entrance later in one place.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  return <Tag className={className}>{children}</Tag>;
}
