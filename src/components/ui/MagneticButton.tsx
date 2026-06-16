import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  download?: boolean | string;
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] transition-colors duration-300 will-change-transform";

const variants = {
  solid: "bg-gold text-ink hover:bg-gold/90",
  outline: "border border-line/20 text-ftext hover:border-gold hover:text-gold",
  ghost: "text-ftext hover:text-gold",
};

/**
 * Button / link that magnetically follows the cursor and nudges its label.
 * Falls back to a static button when reduced motion is requested.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "solid",
  download,
  external,
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.4);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const cls = `${base} ${variants[variant]} ${className}`;
  const content = <span className="pointer-events-none relative z-10">{children}</span>;

  const motionProps = {
    ref,
    className: cls,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "data-cursor": "magnet",
    "aria-label": ariaLabel,
  } as const;

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        onClick={onClick}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type="button" onClick={onClick}>
      {content}
    </motion.button>
  );
}
