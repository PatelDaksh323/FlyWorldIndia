import type { Config } from "tailwindcss";

/**
 * Design system — defined ONCE here. Never hardcode these values in components.
 * Tokens per CLAUDE.md.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        night: "#070C1E", // page background
        panel: "#111C3A", // cards
        gold: "#E8B04B", // primary accent
        coral: "#FF8A5B", // CTA gradient partner
        ink: "#F6F4EC", // body text
        muted: "#93A0C0", // secondary text
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(232, 176, 75, 0.35)",
        card: "0 20px 60px -30px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(100deg, #E8B04B 0%, #FF8A5B 100%)",
        "night-radial":
          "radial-gradient(circle at 50% -10%, rgba(232,176,75,0.10), transparent 55%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
