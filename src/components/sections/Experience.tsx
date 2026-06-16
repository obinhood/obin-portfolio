import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience, cv, education, certifications } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAura from "@/components/ui/SectionAura";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeUp, stagger, viewportOnce } from "@/lib/anim";

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 70%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="relative isolate border-t border-line/10 py-24 sm:py-32">
      <SectionAura tone="magenta" align="left" />
      <div className="container-x">
        <SectionHeading index="02" eyebrow="The CV" title="Where I've shipped." />

        <div ref={trackRef} className="relative">
          {/* Timeline rail */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-line/10 sm:left-[9px]" aria-hidden />
          <motion.div
            className="absolute left-[7px] top-2 w-px origin-top sm:left-[9px]"
            aria-hidden
            style={{
              scaleY: lineScale,
              height: "100%",
              background: "linear-gradient(rgb(var(--cobalt)), rgb(var(--magenta)), rgb(var(--gold)))",
            }}
          />

          <div className="space-y-12 sm:space-y-16">
            {experience.map((role, i) => (
              <motion.article
                key={`${role.company}-${i}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative pl-8 sm:pl-14"
              >
                {/* Node */}
                <span className="absolute left-0 top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full border border-line/20 bg-ink sm:left-0.5">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-2xl font-semibold text-ftext sm:text-3xl">
                    {role.company}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-gold">
                    {role.start} — {role.end}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-muted">
                  {role.role} · {role.location}
                </p>
                <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ftext/80">
                  {role.summary}
                </p>

                <motion.ul
                  variants={stagger(0.06)}
                  className="mt-4 space-y-2"
                >
                  {role.bullets.map((b, bi) => (
                    <motion.li
                      key={bi}
                      variants={fadeUp}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-magenta" />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {role.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line/10 bg-surface/40 px-3 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Education + certs + CV */}
        <div className="mt-16 grid gap-10 border-t border-line/10 pt-12 lg:grid-cols-2">
          <Reveal>
            <h4 className="eyebrow mb-5">Education</h4>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.school} className="flex flex-col">
                  <span className="font-display text-lg text-ftext">{e.school}</span>
                  <span className="text-sm text-muted">{e.degree}</span>
                  {e.detail && <span className="text-xs text-muted/70">{e.detail}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h4 className="eyebrow mb-5">Certifications</h4>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line/10 bg-surface/40 px-3 py-1.5 font-mono text-[11px] text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MagneticButton variant="solid" href={cv.path} download>
                ↓ Download CV (PDF)
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
