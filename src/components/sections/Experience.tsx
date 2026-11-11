import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, lines, cv, education, certifications, type Experience as Role, type LineKey } from "@/data/content";
import PlateHeading from "@/components/ui/PlateHeading";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/anim";

const lineBg: Record<LineKey, string> = { signal: "bg-signal", water: "bg-water", moss: "bg-moss", ink: "bg-ink" };
const lineBorder: Record<LineKey, string> = {
  signal: "border-signal",
  water: "border-water",
  moss: "border-moss",
  ink: "border-ink",
};

function Station({ role, last }: { role: Role; last: boolean }) {
  const [open, setOpen] = useState(false);
  const hasDetail = role.bullets.length > 0 || role.tags.length > 0;
  const id = `detail-${role.company.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 md:grid-cols-[10rem_3.5rem_1fr] md:gap-x-6">
      {/* dates (desktop) */}
      <div className="hidden pt-1 text-right md:block">
        <span className="label block text-ink">{role.end === "Present" ? "Now" : role.end}</span>
        <span className="label mt-1 block">{role.start}</span>
      </div>

      {/* line + station */}
      <div className="relative flex justify-center">
        <span aria-hidden className="absolute bottom-0 top-3 w-[5px] rounded-full bg-rule/10" />
        <motion.span
          aria-hidden
          className={`absolute top-3 w-[5px] origin-top rounded-full ${lineBg[role.line]} ${last ? "bottom-0" : "-bottom-3"}`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1.3, ease: EASE }}
        />
        <span className="relative mt-1 grid h-6 w-6 place-items-center">
          {role.current && <span aria-hidden className="absolute h-6 w-6 animate-pulsering rounded-full bg-signal" />}
          <span
            className={`relative h-6 w-6 rounded-full border-[4px] ${lineBorder[role.line]} ${
              role.current ? "bg-signal" : "bg-paper"
            }`}
          />
        </span>
      </div>

      {/* content */}
      <div className="pb-16 sm:pb-20">
        <span className="label mb-2 block md:hidden">
          {role.start} → {role.end === "Present" ? "Now" : role.end}
        </span>
        <h3 className="font-serif text-[clamp(1.9rem,3vw,2.9rem)] leading-[0.98] tracking-[-0.015em] text-ink">
          {role.company}
        </h3>
        <p className="mt-3 text-[15px] text-ink sm:text-base">
          {role.role}
          <span className="text-ink-2"> · {role.location}</span>
        </p>
        <p className="mt-4 max-w-[62ch] text-pretty text-lg leading-relaxed text-ink/80">{role.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="label inline-flex items-center gap-2">
            <span className={`h-[5px] w-5 rounded-full ${lineBg[role.line]}`} />
            {lines[role.line]}
          </span>
          {hasDetail && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen((o) => !o)}
              className="label group inline-flex items-center gap-2 text-ink"
            >
              <span className="u-link">{open ? "Hide detail" : "Show detail"}</span>
              <span
                aria-hidden
                className={`grid h-5 w-5 place-items-center rounded-full border hair transition-transform duration-500 ${
                  open ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="overflow-hidden"
            >
              {role.bullets.length > 0 && (
                <ul className="mt-6 max-w-[68ch] space-y-3 border-l hair pl-5">
                  {role.bullets.map((b) => (
                    <li key={b} className="relative text-pretty text-[15px] leading-relaxed text-ink/85">
                      <span aria-hidden className={`absolute -left-[23px] top-[9px] h-[5px] w-[5px] rounded-full ${lineBg[role.line]}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                {role.tags.map((t) => (
                  <li key={t} className="font-mono text-[11px] text-ink-2">
                    #{t.toLowerCase().replace(/\s+/g, "-")}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative border-t hair py-28 sm:py-40">
      <div className="container-x">
        <PlateHeading
          plate="03"
          label="The route"
          title="Nine years, *four lines*, one direction of travel."
          note="Read top to bottom: now → 2017"
        />

        {/* line legend */}
        <Reveal className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-y hair py-4">
          <span className="label text-ink">Lines</span>
          {(Object.keys(lines) as LineKey[]).map((k) => (
            <span key={k} className="label inline-flex items-center gap-2.5">
              <span className={`h-[5px] w-7 rounded-full ${lineBg[k]}`} />
              {lines[k]}
            </span>
          ))}
        </Reveal>

        <ol>
          {experience.map((role, i) => (
            <Station key={`${role.company}-${i}`} role={role} last={i === experience.length - 1} />
          ))}
        </ol>

        {/* terminus */}
        <div className="grid grid-cols-[2.25rem_1fr] gap-x-4 md:grid-cols-[10rem_3.5rem_1fr] md:gap-x-6">
          <div className="hidden text-right md:block">
            <span className="label block text-ink">Terminus</span>
          </div>
          <div className="flex justify-center">
            <span aria-hidden className="h-2.5 w-10 rounded-full bg-ink" />
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="label md:hidden">Terminus · </span>
              <span className="label">Education</span>
              <ul className="mt-5 border-t hair">
                {education.map((e) => (
                  <li key={e.school} className="border-b hair py-4">
                    <span className="block font-serif text-2xl text-ink">{e.school}</span>
                    <span className="mt-1 block text-[15px] text-ink/80">{e.degree}</span>
                    {e.detail && <span className="mt-0.5 block text-sm text-ink-2">{e.detail}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="label">Certifications</span>
              <ul className="mt-5 border-t hair">
                {certifications.map((c) => (
                  <li key={c} className="border-b hair py-3 text-[15px] text-ink">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MagneticButton variant="solid" href={cv.path} download>
                  Download the full CV <span aria-hidden>↓</span>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
