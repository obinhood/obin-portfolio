import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, fadeUp, viewportOnce } from "@/lib/anim";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/**
 * Single element that fades + slides up when it enters the viewport. The delay
 * is built into this instance's variant: a `transition` prop would be ignored,
 * because the variant's own transition wins.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Tag = motion[as];
  const variants = {
    hidden: fadeUp.hidden,
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
  };
  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Tag>
  );
}
