import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * A card that tilts in 3D toward the cursor and lifts a light glare, on desktop
 * pointers only. Adds tactile depth to grids without any 3D library. Falls back
 * to a static element under reduced-motion / touch.
 */
export default function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  const fine =
    typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches;
  const enabled = !reduce && fine;

  function onMove(e: React.MouseEvent) {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={enabled ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 } : undefined}
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(240px circle at ${gx} ${gy}, rgba(233,184,95,0.16), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
