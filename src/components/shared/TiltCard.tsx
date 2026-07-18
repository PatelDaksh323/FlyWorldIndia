import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Desktop 3D tilt toward the cursor with a soft gold glare. Touch/reduced-motion inert. */
export default function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const gx = useTransform(px, [0, 1], ["0%", "100%"]);
  const gy = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useTransform([gx, gy], ([x, y]) =>
    `radial-gradient(260px circle at ${x} ${y}, rgba(232,176,75,0.18), transparent 62%)`
  );

  const fine = typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches;
  const on = !reduce && fine;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!on || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { px.set(0.5); py.set(0.5); }}
      style={on ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 } : undefined}
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {on && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glare }}
        />
      )}
    </motion.div>
  );
}
