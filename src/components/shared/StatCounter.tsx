import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` when scrolled into view. Real, working stats — the old
 * site showed 0% / 0 (PRD H-4). Respects reduced-motion by snapping instantly.
 */
export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        if (reduce) {
          setDisplay(value);
          return;
        }

        const duration = 1400;
        let raf = 0;
        let start = 0;
        const step = (t: number) => {
          if (!start) start = t;
          const progress = Math.min((t - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-semibold text-gold sm:text-5xl">
        {prefix}
        {display.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}
