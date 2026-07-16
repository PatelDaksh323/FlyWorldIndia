import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

/**
 * A button/link that leans slightly toward the cursor on hover (desktop only,
 * pointer: fine). A small, premium micro-interaction — not a gimmick. Disabled
 * under reduced-motion or on touch.
 */
export default function MagneticButton({
  children,
  className,
  to,
  href,
  target,
  rel,
  onClick,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const fine =
    typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches;
  const enabled = !reduce && fine;

  function onMove(e: React.MouseEvent) {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = <span className="pointer-events-none">{children}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {to ? (
        <Link to={to} className={cn(className)} onClick={onClick}>
          {inner}
        </Link>
      ) : (
        <a href={href} target={target} rel={rel} className={cn(className)} onClick={onClick}>
          {inner}
        </a>
      )}
    </motion.div>
  );
}
