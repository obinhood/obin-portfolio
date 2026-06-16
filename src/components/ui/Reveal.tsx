import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/anim";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** Single element that fades + slides up when it enters the viewport. */
export default function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
