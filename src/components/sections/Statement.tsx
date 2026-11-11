import { motion } from "framer-motion";
import { profile, socials, figures } from "@/data/content";
import { projects } from "@/data/projects";
import ContourField from "@/components/art/ContourField";
import ScrubText from "@/components/ui/ScrubText";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/anim";

function CityPlate({
  city,
  coords,
  seed,
  fig,
  dot,
}: {
  city: string;
  coords: string;
  seed: number;
  fig: string;
  dot: { x: string; y: string };
}) {
  return (
    <figure className="mount relative p-2.5">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <ContourField seed={seed} cell={10} scale={0.0042} step={0.14} speed={0.012} intensity={1.6} className="absolute inset-0" />
        <span
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-signal shadow-[0_0_0_1px_rgb(var(--signal))]"
          style={{ left: dot.x, top: dot.y }}
          aria-hidden
        />
        <span className="label absolute left-3 top-3 text-ink">{fig}</span>
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 px-1 pb-0.5 pt-3">
        <span className="font-serif text-2xl italic text-ink">{city}</span>
        <span className="label tabular-nums">{coords}</span>
      </figcaption>
    </figure>
  );
}

export default function Statement() {
  const built = projects.filter((p) => parseInt(p.year, 10) >= 2024).length;
  const allFigures = [
    ...figures,
    { value: built, label: "Products and prototypes designed and built end to end since 2024" },
  ];

  return (
    <section id="statement" className="relative py-28 sm:py-40" aria-label="About">
      <div className="container-x">
        <div className="mb-12 flex items-center gap-4 sm:mb-16">
          <span className="label whitespace-nowrap text-ink">
            <span className="text-signal-ink">Plate 01</span>
            <span className="mx-2 text-ink-2/60">/</span>Statement
          </span>
          <motion.span
            aria-hidden
            className="ticks min-w-0 flex-1 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <span className="label hidden md:inline">Prague → London</span>
        </div>

        <h2 className="sr-only">About Obin</h2>
        <ScrubText
          text={`I'm Obin. ${profile.statement}`}
          className="max-w-[30ch] font-serif text-[clamp(1.9rem,3.9vw,4rem)] leading-[1.08] tracking-[-0.01em] text-ink"
        />

        {/* diptych + notes */}
        <div className="mt-24 grid gap-12 sm:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6">
            <Reveal>
              <CityPlate city="Praha" coords="50.08° N 14.44° E" seed={23} fig="Fig. 1a · Raised" dot={{ x: "56%", y: "48%" }} />
            </Reveal>
            <Reveal delay={0.12} className="sm:mt-16">
              {profile.portrait ? (
                <figure className="mount relative p-2.5">
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                    <img
                      src={profile.portrait}
                      alt={`Portrait of ${profile.name}`}
                      loading="lazy"
                      className="print-tone is-live absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="label absolute left-3 top-3 text-ink">Fig. 1b · Based</span>
                  </div>
                  <figcaption className="flex items-baseline justify-between gap-3 px-1 pb-0.5 pt-3">
                    <span className="font-serif text-2xl italic text-ink">London</span>
                    <span className="label tabular-nums">51.51° N 0.13° W</span>
                  </figcaption>
                </figure>
              ) : (
                <CityPlate city="London" coords="51.51° N 0.13° W" seed={41} fig="Fig. 1b · Based" dot={{ x: "44%", y: "56%" }} />
              )}
            </Reveal>
          </div>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-5 lg:col-start-8"
          >
            {profile.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={`text-pretty leading-relaxed text-ink/85 ${i === 0 ? "text-xl sm:text-[1.4rem]" : "mt-5 text-base sm:text-lg"}`}
              >
                {para}
              </motion.p>
            ))}

            <motion.dl variants={fadeUp} className="mt-10 border-t hair">
              {profile.fieldNotes.map((f) => (
                <div key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b hair py-3">
                  <dt className="label pt-0.5">{f.k}</dt>
                  <dd className="text-[15px] text-ink">{f.v}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="u-link label text-ink"
                >
                  {s.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* figures */}
        <div className="mt-24 grid border-t hair sm:mt-32 sm:grid-cols-2 lg:grid-cols-4">
          {allFigures.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 0.08}
              className={`border-b hair py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:py-10 ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "sm:border-l" : ""}`}
            >
              <span className="label">Fig. {String(i + 2).padStart(2, "0")}</span>
              <Counter
                value={f.value}
                decimals={"decimals" in f ? f.decimals : 0}
                prefix={"prefix" in f ? f.prefix : ""}
                suffix={"suffix" in f ? f.suffix : ""}
                className="mt-4 block font-serif text-[clamp(3.5rem,5.5vw,5.25rem)] leading-none text-ink"
              />
              <p className="mt-4 max-w-[30ch] text-pretty text-sm leading-relaxed text-ink-2">{f.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
