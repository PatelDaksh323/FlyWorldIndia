import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Button/link that leans toward the cursor (desktop pointer only). */
export default function MagneticButton({
  children, className, to, href, target, rel, strength = 0.3,
}: {
  children: ReactNode; className?: string; to?: string; href?: string;
  target?: string; rel?: string; strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  const fine = typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches;
  const on = !reduce && fine;

  const inner = <span className="pointer-events-none">{children}</span>;
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!on || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {to ? (
        <Link to={to} className={cn(className)}>{inner}</Link>
      ) : (
        <a href={href} target={target} rel={rel} className={cn(className)}>{inner}</a>
      )}
    </motion.div>
  );
}
