import type { Config } from "tailwindcss";

/**
 * Design system. Editorial, restrained — "private bank, not travel agency."
 *
 * Palette is ONLY these six tokens. Gold is an accent, never a fill: it marks
 * the single most important thing in a section, nothing more. No secondary
 * hues, no gradients, no glass. Depth budget for the whole site is one soft
 * radial glow behind the hero.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        night: "#070C1E", // page background
        panel: "#111C3A", // raised surfaces / bands
        gold: "#E8B04B", // accent ONLY
        coral: "#FF8A5B", // sparing warm accent
        ink: "#F6F4EC", // primary text
        muted: "#93A0C0", // secondary text
      },
      fontFamily: {
        // Fraunces = headlines only. Inter = everything else.
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 5vw, 4.75rem)", { lineHeight: "1.03", letterSpacing: "-0.025em" }],
        display: ["clamp(2rem, 3.4vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        title: ["clamp(1.5rem, 2vw, 2rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        label: "0.24em",
      },
      maxWidth: {
        prose: "62ch",
      },
      borderRadius: {
        xl2: "1rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
