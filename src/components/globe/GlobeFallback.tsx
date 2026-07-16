import { ORIGIN, DESTINATIONS } from "./destinations";

/**
 * Pure-CSS/SVG stand-in shown when WebGL is unavailable or the globe chunk is
 * still loading (PRD H-3: "degrades gracefully if WebGL unavailable"). No
 * Three.js, no canvas — just a wireframe orbit that reads as "globe".
 */
export default function GlobeFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="relative aspect-square w-[min(78%,420px)]">
        <div className="absolute inset-0 rounded-full border border-gold/25" />
        <div className="absolute inset-[8%] rounded-full border border-gold/15" />
        <div className="absolute inset-0 rounded-full border-x border-gold/15 [transform:rotateY(70deg)]" />
        <div className="absolute inset-0 rounded-full border-x border-gold/15 [transform:rotateY(35deg)]" />
        <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-gold/15" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, rgba(232,176,75,0.18), transparent 60%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </div>
      <span className="sr-only">
        Flyworld India connects {ORIGIN.name} to {DESTINATIONS.map((d) => d.name).join(", ")}.
      </span>
    </div>
  );
}
