import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { EASE } from "@/lib/anim";

/** Paper / night switch: a half-inked disc that turns over. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "paper (light)" : "night (dark)"} theme`}
      title={isDark ? "Paper edition" : "Night edition"}
      className="grid h-10 w-10 place-items-center rounded-full border hair text-ink transition-colors hover:border-ink"
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        aria-hidden
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 1.5 A7.5 7.5 0 0 1 9 16.5 Z" fill="currentColor" />
      </motion.svg>
    </button>
  );
}
