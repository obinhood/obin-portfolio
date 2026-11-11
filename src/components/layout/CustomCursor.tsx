import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LABELS: Record<string, string> = { view: "View", zoom: "Zoom" };

/**
 * Keeps the native pointer and adds a small label tag beside it over
 * projects and screenshots ([data-cursor="view" | "zoom"]). Fine pointers
 * only, never with reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let lx = -1;
    let ly = -1;
    let raf = 0;
    const classify = (target: EventTarget | null) => {
      const el = target instanceof Element ? target.closest<HTMLElement>("[data-cursor]") : null;
      setLabel(el ? LABELS[el.dataset.cursor ?? ""] ?? null : null);
    };
    const move = (e: PointerEvent) => {
      lx = e.clientX;
      ly = e.clientY;
      x.set(lx);
      y.set(ly);
      classify(e.target);
    };
    // Content slides under a still pointer while scrolling: re-check what's below.
    const onScroll = () => {
      if (raf || lx < 0) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        classify(document.elementFromPoint(lx, ly));
      });
    };

    const onClick = () => setLabel(null);

    window.addEventListener("pointermove", move, { passive: true });
    // capture: also hear scrolls inside overflow containers like the case-study sheet
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="ml-4 mt-4 inline-flex items-center gap-1.5 rounded-full border border-rule/15 bg-paper/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur"
        initial={false}
        animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {label ?? "View"} <span className="text-signal">→</span>
      </motion.span>
    </motion.div>
  );
}
