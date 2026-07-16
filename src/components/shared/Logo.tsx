import { cn } from "@/lib/cn";

/** Inline SVG mark — a wireframe globe with a golden flight arc. */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Flyworld India logo"
    >
      <circle cx="32" cy="32" r="18" fill="none" stroke="#E8B04B" strokeWidth="2.5" />
      <ellipse
        cx="32"
        cy="32"
        rx="7"
        ry="18"
        fill="none"
        stroke="#E8B04B"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <line x1="14" y1="32" x2="50" y2="32" stroke="#E8B04B" strokeWidth="1.5" opacity="0.55" />
      <path
        d="M18 40 Q32 14 46 24"
        fill="none"
        stroke="#FF8A5B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="46" cy="24" r="3" fill="#FF8A5B" />
    </svg>
  );
}
