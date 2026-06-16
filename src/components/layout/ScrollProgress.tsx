import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[9998] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgb(var(--cobalt)), rgb(var(--magenta)), rgb(var(--gold)))",
      }}
    />
  );
}
