import { motion, useReducedMotion } from "framer-motion";
import { charReveal, EASE } from "@/lib/anim";

type Props = {
  text: string;
  className?: string;
  /** delay before the whole line starts (s) */
  delay?: number;
  /** stagger per word (s) */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
};

/**
 * Kinetic per-word reveal. Each word slides up from a clipped baseline.
 * Fully accessible: the real text sits in aria-label and the animated
 * spans are aria-hidden. Reduced motion shows the text immediately.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  as = "span",
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as];

  if (reduce) {
    const Plain = as as keyof JSX.IntrinsicElements;
    return <Plain className={className}>{text}</Plain>;
  }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            variants={charReveal}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
