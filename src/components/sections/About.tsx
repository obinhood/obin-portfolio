import { motion } from "framer-motion";
import { profile, socials } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAura from "@/components/ui/SectionAura";
import Reveal from "@/components/ui/Reveal";
import { stagger, fadeUp, viewportOnce } from "@/lib/anim";

export default function About() {
  return (
    <section id="about" className="relative isolate py-24 sm:py-32">
      <SectionAura tone="cobalt" align="right" />
      <div className="container-x">
        <SectionHeading index="01" eyebrow="Who I am" title="A data person turning into a product one." />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Narrative */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6"
          >
            {profile.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-pretty text-xl leading-relaxed text-ftext/90 sm:text-2xl"
              >
                {para}
              </motion.p>
            ))}

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  data-cursor="magnet"
                  className="group inline-flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  {s.label}
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait card */}
          <Reveal className="lg:pt-2">
            <div className="glass overflow-hidden rounded-xl2 p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
                {/* Monogram is the default; set profile.portrait to a real image
                    path (e.g. "/portrait.jpg") to show a photo instead. */}
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-cobalt/30 via-magenta/20 to-gold/30">
                  <span className="font-display text-[7rem] font-bold text-ftext/90">
                    {profile.initials}
                  </span>
                </div>
                {profile.portrait && (
                  <img
                    src={profile.portrait}
                    alt={`Portrait of ${profile.name}`}
                    loading="lazy"
                    className="relative h-full w-full object-cover"
                  />
                )}
                <div className="contours absolute inset-0 opacity-30 mix-blend-overlay" />
              </div>
              <div className="flex items-start gap-3 px-3 py-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-mono uppercase tracking-[0.15em] text-ftext">Currently </span>
                  {profile.currently}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
