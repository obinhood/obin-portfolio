import { motion } from "framer-motion";
import { skills, marquee } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAura from "@/components/ui/SectionAura";
import Marquee from "@/components/ui/Marquee";
import { fadeUp, stagger, viewportOnce } from "@/lib/anim";

export default function Skills() {
  return (
    <section id="skills" className="relative isolate border-t border-line/10 py-24 sm:py-32">
      <SectionAura tone="cobalt" align="left" />
      {/* Marquee band */}
      <div className="mb-20 border-y border-line/10 py-6">
        <Marquee items={marquee} duration={36} />
      </div>

      <div className="container-x">
        <SectionHeading index="04" eyebrow="Toolkit" title="The stack I reach for." />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-px overflow-hidden rounded-xl2 border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((group) => (
            <motion.div key={group.group} variants={fadeUp} className="bg-ink/50 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line/10 bg-surface/40 px-3 py-1.5 text-sm text-ftext/80 transition-colors hover:border-cobalt hover:text-ftext"
                  >
                    {item}
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
