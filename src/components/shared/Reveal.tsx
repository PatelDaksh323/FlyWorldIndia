import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Tag = "div" | "section" | "li" | "article" | "span";
const MOTION = { div: motion.div, section: motion.section, li: motion.li, article: motion.article, span: motion.span } as const;

/**
 * Scroll reveal — soft fade + small rise with expo easing (skill: keep y small,
 * once, no re-trigger). Under reduced-motion it renders in final position.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
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
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </Comp>
  );
}
