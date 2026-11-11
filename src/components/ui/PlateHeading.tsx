import { motion } from "framer-motion";
import { RichReveal } from "./Rich";
import { EASE } from "@/lib/anim";

type Props = {
  plate: string; // "02"
  label: string; // "Selected work"
  title: string; // supports *italic*
  note?: string; // small annotation on the right of the rule
  className?: string;
};

/**
 * Section opener styled as an atlas plate: plate number, a ruler with ticks
 * that draws across, a small annotation, then the serif title.
 */
export default function PlateHeading({ plate, label, title, note, className = "" }: Props) {
  return (
    <header className={`mb-14 sm:mb-20 ${className}`}>
      <div className="mb-8 flex items-center gap-4">
        <span className="label whitespace-nowrap text-ink">
          <span className="text-signal-ink">Plate {plate}</span>
          <span className="mx-2 text-ink-2/60">/</span>
          {label}
        </span>
        <motion.span
          aria-hidden
          className="ticks min-w-0 flex-1 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        {note && <span className="label hidden whitespace-nowrap md:inline">{note}</span>}
      </div>
      <RichReveal as="h2" text={title} className="max-w-[16ch] font-serif text-plate text-ink" />
    </header>
  );
}
