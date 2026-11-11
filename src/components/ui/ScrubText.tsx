import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { richWords } from "./Rich";

type Props = {
  text: string; // supports *italic*
  className?: string;
  emClass?: string;
};

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.55, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/** A paragraph that inks itself in, word by word, as it scrolls through view. */
export default function ScrubText({ text, className = "", emClass = "font-serif italic" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words = richWords(text);
  const n = words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const inner = word.parts.map((p, j) => (
          <span key={j} className={p.em ? emClass : undefined}>
            {p.t}
          </span>
        ));
        const node = reduce ? (
          <span>{inner}</span>
        ) : (
          <Word progress={scrollYProgress} range={[i / n, Math.min(1, (i + 2) / n)]}>
            {inner}
          </Word>
        );
        return (
          <span key={i}>
            {node}
            {i < n - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
