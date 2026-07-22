import { cn } from "@/lib/cn";

/**
 * Flyworld wordmark — the blue rounded logo with the "FlyWorld" wordmark and a
 * ™ mark, tagline rules removed, transparent around the blue tile.
 *
 * ⚠ This is a faithful SVG recreation from the shared logo image. For a
 * pixel-perfect mark, drop the official PNG/SVG into src/assets and swap the
 * <svg> below for an <img>.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 236 72"
      className={cn("block h-auto w-auto", className)}
      role="img"
      aria-label="FlyWorld"
    >
      <rect x="0" y="0" width="236" height="72" rx="16" fill="#00A1E4" />
      <text
        x="20"
        y="48"
        fill="#FFFFFF"
        fontFamily="'Fraunces', Georgia, 'Times New Roman', serif"
        fontWeight="600"
        fontSize="40"
        letterSpacing="-0.5"
      >
        FlyWorld
      </text>
      {/* ™ */}
      <circle cx="222" cy="20" r="11" fill="#FFFFFF" />
      <text
        x="222"
        y="24"
        textAnchor="middle"
        fill="#00A1E4"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="11"
      >
        ™
      </text>
    </svg>
  );
}
