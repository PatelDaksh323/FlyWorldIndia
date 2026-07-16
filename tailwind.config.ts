import type { Config } from "tailwindcss";

/**
 * Design system — "Global Mobility, premium." Defined ONCE here.
 *
 * Direction: a deep, blue-biased space-navy ground with a single refined gold
 * signature and a cool azure for interactive accents. Deliberately steps away
 * from the generic dark + gold→coral-gradient look. Neutrals are hue-biased
 * (never flat grey), surfaces are layered, motion is restrained and smooth.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Grounds (blue-biased, layered)
        night: "#070A14", // page background (deepest)
        base: "#070A14",
        surface: "#0D1322", // sections / raised ground
        panel: "#121A2E", // cards
        elevated: "#182238", // hover / popovers
        line: "rgba(148, 163, 205, 0.14)", // hairline borders

        // Signature + accents
        gold: "#E9B85F", // primary brand accent (refined)
        "gold-deep": "#C9973F",
        azure: "#6EA0FF", // interactive / links / tech accent
        coral: "#FF8259", // used sparingly for warmth

        // Text (cool premium)
        ink: "#EDEFF6", // primary text
        muted: "#9AA6C4", // secondary text
        faint: "#657193", // tertiary / labels
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Tighter, more editorial scale
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "headline": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(233, 184, 95, 0.45)",
        "glow-azure": "0 0 80px -24px rgba(110, 160, 255, 0.5)",
        card: "0 24px 70px -40px rgba(0, 0, 0, 0.85)",
        lift: "0 30px 80px -32px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(148,163,205,0.06)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "gold-sheen": "linear-gradient(135deg, #F3CE7E 0%, #E9B85F 45%, #C9973F 100%)",
        "azure-sheen": "linear-gradient(135deg, #8FB8FF 0%, #6EA0FF 100%)",
        "aurora":
          "radial-gradient(60% 50% at 20% 0%, rgba(233,184,95,0.10), transparent 60%), radial-gradient(50% 50% at 90% 10%, rgba(110,160,255,0.10), transparent 55%)",
        "hairline": "linear-gradient(90deg, transparent, rgba(148,163,205,0.25), transparent)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      letterSpacing: {
        label: "0.22em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
