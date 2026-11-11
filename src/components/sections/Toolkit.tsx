import { motion } from "framer-motion";
import { skills, capabilities, type SymbolKey } from "@/data/content";
import PlateHeading from "@/components/ui/PlateHeading";
import Marquee from "@/components/ui/Marquee";
import { fadeUp, stagger, viewportOnce } from "@/lib/anim";

/** Cartographic legend symbols, one per skill group. */
function Symbol({ kind }: { kind: SymbolKey }) {
  const common = { width: 44, height: 22, viewBox: "0 0 44 22", "aria-hidden": true } as const;
  switch (kind) {
    case "solid":
      return (
        <svg {...common}>
          <path d="M2 11 H42" className="stroke-signal" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "dashed":
      return (
        <svg {...common}>
          <path d="M2 11 H42" className="stroke-ink" strokeWidth="2" strokeDasharray="5 4" />
        </svg>
      );
    case "contour":
      return (
        <svg {...common} className="fill-none stroke-moss">
          <path d="M2 16 C12 4 30 4 42 16" strokeWidth="1.2" />
          <path d="M8 16 C15 8 28 8 36 16" strokeWidth="1.2" />
          <path d="M14 16 C19 12 25 12 30 16" strokeWidth="1.2" />
        </svg>
      );
    case "rail":
      return (
        <svg {...common}>
          <path d="M2 11 H42" className="stroke-water" strokeWidth="3" />
          {[8, 22, 36].map((x) => (
            <circle key={x} cx={x} cy={11} r={4} className="fill-paper stroke-water" strokeWidth="2" />
          ))}
        </svg>
      );
    case "hatch":
      return (
        <svg {...common}>
          <defs>
            <pattern id="hatch-p" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M0 0 V4" className="stroke-ink" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect x="8" y="2" width="28" height="18" fill="url(#hatch-p)" className="stroke-ink" strokeWidth="1" />
        </svg>
      );
    case "summit":
      return (
        <svg {...common}>
          <path d="M22 3 L31 19 H13 Z" className="fill-signal" />
          <circle cx="22" cy="14" r="1.6" className="fill-paper" />
        </svg>
      );
  }
}

export default function Toolkit() {
  return (
    <section id="toolkit" className="relative border-t hair pb-28 pt-20 sm:pb-40 sm:pt-28">
      <Marquee items={capabilities} duration={80} className="mb-20 sm:mb-28" />

      <div className="container-x">
        <PlateHeading
          plate="04"
          label="Legend"
          title="The *toolkit*, drawn as a map key."
          note="Symbols not to scale"
        />

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mount grid gap-px bg-rule/10 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((g, i) => (
            <motion.div key={g.group} variants={fadeUp} className="bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b hair pb-4">
                <div className="flex items-center gap-3">
                  <Symbol kind={g.symbol} />
                  <h3 className="font-serif text-[1.7rem] leading-none text-ink">{g.group}</h3>
                </div>
                <span className="label tabular-nums">{String.fromCharCode(65 + i)}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-1 gap-y-1.5">
                {g.items.map((item, j) => (
                  <li key={item} className="text-base text-ink/85 sm:text-[17px]">
                    <span className="transition-colors duration-300 hover:text-signal-ink">{item}</span>
                    {j < g.items.length - 1 && <span className="mx-1.5 text-ink-2/50">·</span>}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
