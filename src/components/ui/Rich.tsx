import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/anim";

/** Split "plain *italic* plain" into segments. */
export function parseRich(text: string) {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part) =>
    part.startsWith("*") && part.endsWith("*")
      ? { text: part.slice(1, -1), em: true }
      : { text: part, em: false }
  );
}

export type Word = { parts: { t: string; em: boolean }[] };

/**
 * Tokenise rich text into words, where a word can mix styles
 * ("*four lines*," keeps its comma attached).
 */
export function richWords(text: string): Word[] {
  const words: Word[] = [];
  let cur: Word | null = null;
  for (const seg of parseRich(text)) {
    for (const tok of seg.text.split(/(\s+)/)) {
      if (!tok) continue;
      if (/^\s+$/.test(tok)) {
        cur = null;
        continue;
      }
      if (!cur) {
        cur = { parts: [] };
        words.push(cur);
      }
      cur.parts.push({ t: tok, em: seg.em });
    }
  }
  return words;
}

/** Inline rich text: *phrases* become italic serif. */
export function Rich({ text, emClass = "font-serif italic" }: { text: string; emClass?: string }) {
  return (
    <>
      {parseRich(text).map((seg, i) =>
        seg.em ? (
          <em key={i} className={emClass}>
            {seg.text}
          </em>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        )
      )}
    </>
  );
}

type RevealProps = {
  text: string;
  className?: string;
  emClass?: string;
  delay?: number;
  stagger?: number;
  /** animate immediately instead of on scroll-in */
  immediate?: boolean;
  /** gate the animation (e.g. wait for the intro) */
  ready?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Masked word-by-word rise, keeping *italic* phrases styled. Real text is
 * exposed once for screen readers; the animated words are aria-hidden.
 */
export function RichReveal({
  text,
  className = "",
  emClass = "italic",
  delay = 0,
  stagger = 0.05,
  immediate = false,
  ready = true,
  as = "h2",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = richWords(text);
  const plain = text.replace(/\*/g, "");

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className}>
        <Rich text={text} emClass={emClass} />
      </Plain>
    );
  }

  const trigger = immediate
    ? { animate: ready ? "show" : "hidden" }
    : { whileInView: ready ? "show" : undefined, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{plain}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em", paddingRight: "0.06em", marginRight: "-0.06em" }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {word.parts.map((p, j) =>
                p.em ? (
                  <span key={j} className={emClass}>
                    {p.t}
                  </span>
                ) : (
                  <Fragment key={j}>{p.t}</Fragment>
                )
              )}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
