import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  intensity?: number;
  onClick?: () => void;
};

/**
 * 3D hover tilt with a cursor-following spotlight. The spotlight position is
 * exposed via the --mx / --my CSS variables so children can paint a glow.
 */
export default function TiltCard({ children, className = "", intensity = 7, onClick }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * intensity * 2);
    ry.set((px - 0.5) * intensity * 2);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`group/tilt relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </motion.div>
  );
}
