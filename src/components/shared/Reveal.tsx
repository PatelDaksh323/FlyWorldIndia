import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Tag = "div" | "section" | "li" | "article" | "span";

const MOTION = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

/**
 * Scroll reveal with premium easing. Enters once when it scrolls into view.
 * Fully inert under reduced-motion (renders in final position immediately).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Comp = MOTION[as];

  if (reduce) return <Comp className={className}>{children}</Comp>;

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </Comp>
  );
}
