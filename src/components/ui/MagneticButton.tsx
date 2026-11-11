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
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-500 will-change-transform";

const variants = {
  solid: "bg-ink text-paper",
  outline: "border border-rule/25 text-ink hover:text-paper",
  ghost: "text-ink hover:text-signal-ink",
};

const wipe = {
  solid: "bg-signal-ink",
  outline: "bg-ink",
  ghost: "",
};

/**
 * Pill button / link that leans towards the cursor; a colour wipe rises from
 * the baseline on hover. Static when reduced motion is requested.
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
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {wipe[variant] && (
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 rounded-full ${wipe[variant]} transition-transform duration-500 ease-expo group-hover:scale-y-100`}
        />
      )}
      <span className="pointer-events-none relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    ref,
    className: cls,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "data-cursor": "hide",
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
