import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

/** Animated dark/light switch. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line/15 text-ftext transition-colors hover:border-gold hover:text-gold"
      data-cursor="magnet"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-base"
      >
        {isDark ? "☾" : "☀"}
      </motion.span>
    </button>
  );
}
