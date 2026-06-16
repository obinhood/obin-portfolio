/** @type {import('tailwindcss').Config} */
// Design tokens are defined as CSS custom properties in src/index.css so that the
// theme toggle (dark <-> light) can swap them at runtime. Tailwind colour utilities
// below resolve to those variables and stay alpha-aware via <alpha-value>.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--bg) / <alpha-value>)",
        "ink-soft": "rgb(var(--bg-soft) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ftext: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        cobalt: "rgb(var(--cobalt) / <alpha-value>)",
        magenta: "rgb(var(--magenta) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Clash Display"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid display scale
        "display-sm": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display": ["clamp(3.5rem, 11vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(4rem, 16vw, 14rem)", { lineHeight: "0.85", letterSpacing: "-0.045em" }],
      },
      maxWidth: {
        container: "1240px",
      },
      borderRadius: {
        xl2: "1.5rem",
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
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 32s) linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};
