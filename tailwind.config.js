/** @type {import('tailwindcss').Config} */
// "Atlas" design tokens. Colours live as RGB triples in src/index.css so the
// paper / night themes can swap them at runtime; utilities stay alpha-aware.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-2": "rgb(var(--paper-2) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
        "signal-ink": "rgb(var(--signal-ink) / <alpha-value>)",
        water: "rgb(var(--water) / <alpha-value>)",
        moss: "rgb(var(--moss) / <alpha-value>)",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        plate: ["clamp(2.5rem, 5.4vw, 5.75rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        mega: ["clamp(4.5rem, 16vw, 19rem)", { lineHeight: "0.84", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        container: "1480px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulsering: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        pulsering: "pulsering 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};
