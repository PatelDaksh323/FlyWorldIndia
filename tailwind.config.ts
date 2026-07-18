import type { Config } from "tailwindcss";

/**
 * Design system — cinematic & rich (skill-guided "Modern Dark" direction):
 * deep navy ground, gold→coral gradient accents, ambient glow, glass surfaces,
 * layered depth and smooth expo.out motion. Six brand tokens, used generously.
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
        night: "#070C1E", // page background
        panel: "#111C3A", // cards / surfaces
        gold: "#E8B04B", // primary accent
        coral: "#FF8A5B", // gradient partner
        ink: "#F6F4EC", // body text
        muted: "#93A0C0", // secondary text
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 5.5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        display: ["clamp(2rem, 3.6vw, 3.4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        title: ["clamp(1.5rem, 2.2vw, 2.15rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      letterSpacing: { label: "0.22em" },
      maxWidth: { prose: "62ch" },
      borderRadius: { xl2: "1.25rem", "3xl": "1.75rem" },
      backgroundImage: {
        "gold-gradient": "linear-gradient(120deg, #F2C766 0%, #E8B04B 42%, #FF8A5B 100%)",
        "gold-soft": "linear-gradient(120deg, rgba(232,176,75,0.16), rgba(255,138,91,0.10))",
        aurora:
          "radial-gradient(55% 45% at 15% 0%, rgba(232,176,75,0.16), transparent 60%), radial-gradient(50% 45% at 90% 5%, rgba(255,138,91,0.12), transparent 55%), radial-gradient(40% 40% at 60% 100%, rgba(232,176,75,0.08), transparent 60%)",
        "sheen-text": "linear-gradient(100deg, #F6E3B4 0%, #E8B04B 45%, #FF8A5B 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -14px rgba(232,176,75,0.5)",
        "glow-lg": "0 0 120px -30px rgba(232,176,75,0.55)",
        card: "0 30px 80px -40px rgba(0,0,0,0.9)",
        lift: "0 24px 60px -24px rgba(0,0,0,0.85), inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(4%, -3%) scale(1.08)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.6s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
