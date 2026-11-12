import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { EASE } from "@/lib/anim";

export const accentText = { signal: "text-signal-ink", water: "text-water", moss: "text-moss" } as const;
export const accentBg = { signal: "bg-signal", water: "bg-water", moss: "bg-moss" } as const;

type Props = {
  project: Project;
  number: string;
  layout: "wide" | "left" | "right";
  onOpen: (slug: string) => void;
};

/** A framed print whose image drifts against the frame as you scroll. */
function Print({ src, alt, aspect, number, caption }: { src: string; alt: string; aspect: string; number: string; caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-3.5%", "3.5%"]);

  return (
    <motion.figure
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(12% 8% 12% 8%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, ease: EASE }}
      className="mount p-2 sm:p-3"
    >
      <div ref={ref} className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        {/* parallax on the wrapper, hover zoom on the image: two transforms that don't fight */}
        <motion.div style={{ y }} className="absolute inset-x-0 -top-[4%] h-[108%]">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
          />
        </motion.div>
      </div>
      <figcaption className="flex justify-between gap-4 px-0.5 pt-2.5">
        <span className="label">Fig. {number}</span>
        <span className="label truncate">{caption}</span>
      </figcaption>
    </motion.figure>
  );
}

function Kicker({ project, number }: { project: Project; number: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs tabular-nums text-ink">{number}</span>
      <span className={`h-px w-8 ${accentBg[project.accent]}`} />
      <span className={`label ${accentText[project.accent]}`}>{project.category}</span>
    </div>
  );
}

function Title({ project, big = false }: { project: Project; big?: boolean }) {
  return (
    <h3
      className={`mt-5 font-serif leading-[0.9] tracking-[-0.02em] text-ink ${
        big ? "text-[clamp(3rem,6.5vw,6.5rem)]" : "text-[clamp(2.6rem,4.6vw,4.5rem)]"
      }`}
    >
      <span className="inline-block transition-transform duration-700 ease-expo group-hover:translate-x-2 group-hover:italic">
        {project.name}
      </span>
    </h3>
  );
}

/**
 * The card's one real control. Its ::after stretches over the whole article,
 * so the print and title are clickable while the heading stays a heading.
 */
function Body({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <>
      <p className="mt-4 max-w-[34ch] text-pretty text-lg leading-snug text-ink/80 sm:text-xl">{project.tagline}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="label">{project.year}</span>
        <span className="label">{project.role}</span>
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          data-cursor="view"
          className="label inline-flex items-center gap-2 text-ink after:absolute after:inset-0 after:z-10 after:content-['']"
        >
          Read case study<span className="sr-only">: {project.name}</span>
          <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
            →
          </span>
        </button>
      </div>
    </>
  );
}

function Meta({ project, number, onOpen }: { project: Project; number: string; onOpen: (slug: string) => void }) {
  return (
    <div>
      <Kicker project={project} number={number} />
      <Title project={project} />
      <Body project={project} onOpen={onOpen} />
    </div>
  );
}

// Frame each print to its screenshot: desktop captures are 16:10, phone composites 4:3 (the default).
const ASPECT: Record<string, string> = {
  mamaloop: "aspect-[8/5]",
};

export default function FeaturedProject({ project, number, layout, onOpen }: Props) {
  const img = project.image ?? "";
  const caption = `${project.name}, ${project.category}`;

  return (
    <article className="group relative">
      <div>
        {layout === "wide" && (
          <div>
            <Print src={img} alt={`${project.name} cover`} aspect="aspect-[16/9] md:aspect-[21/9]" number={number} caption={caption} />
            <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <Kicker project={project} number={number} />
                <Title project={project} big />
              </div>
              <div className="md:col-span-4 md:col-start-9 md:pb-3">
                <Body project={project} onOpen={onOpen} />
              </div>
            </div>
          </div>
        )}

        {layout === "left" && (
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Print
                src={img}
                alt={`${project.name} cover`}
                aspect={ASPECT[project.slug] ?? "aspect-[4/3]"}
                number={number}
                caption={caption}
              />
            </div>
            <div className="md:col-span-5">
              <Meta project={project} number={number} onOpen={onOpen} />
            </div>
          </div>
        )}

        {layout === "right" && (
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            <div className="order-2 md:order-1 md:col-span-5">
              <Meta project={project} number={number} onOpen={onOpen} />
            </div>
            <div className="order-1 md:order-2 md:col-span-7">
              <Print
                src={img}
                alt={`${project.name} cover`}
                aspect={ASPECT[project.slug] ?? "aspect-[4/3]"}
                number={number}
                caption={caption}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
