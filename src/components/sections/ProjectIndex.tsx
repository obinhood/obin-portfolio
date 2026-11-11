import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { Project } from "@/data/projects";
import { accentBg, accentText } from "./FeaturedProject";

type Props = {
  items: { project: Project; number: string }[];
  onOpen: (slug: string) => void;
};

/**
 * The full index as an editorial table of contents. On fine pointers a framed
 * preview follows the cursor (not for reduced motion).
 */
export default function ProjectIndex({ items, onOpen }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const reduce = useReducedMotion();

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t hair">
        {items.map(({ project, number }, i) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => onOpen(project.slug)}
              onPointerEnter={(e) => !reduce && e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
              aria-label={`Open case study: ${project.name}`}
              data-cursor="view"
              className="group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 border-b hair py-5 text-left sm:py-7 md:grid-cols-[3rem_minmax(0,1fr)_19rem_4.5rem_2rem]"
            >
              {/* route sweep */}
              <span
                aria-hidden
                className={`absolute bottom-[-1px] left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 ${accentBg[project.accent]}`}
              />
              <span className="font-mono text-xs tabular-nums text-ink-2">{number}</span>
              <span className="min-w-0">
                <span className="block truncate font-serif text-[clamp(1.75rem,3.1vw,3rem)] leading-[1.05] text-ink transition-transform duration-700 ease-expo group-hover:translate-x-3 group-hover:italic">
                  {project.name}
                </span>
                <span className="mt-1 block truncate text-sm text-ink-2 md:hidden">{project.category}</span>
              </span>
              <span className={`label hidden truncate md:block ${accentText[project.accent]}`}>{project.category}</span>
              <span className="label hidden md:block">{project.year}</span>
              <span
                aria-hidden
                className="justify-self-end text-xl text-ink transition-transform duration-500 ease-expo group-hover:-rotate-45"
              >
                →
              </span>
              {project.image && (
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="print-tone col-span-3 mt-4 aspect-[16/9] w-full object-cover object-top md:hidden"
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* floating preview (desktop, fine pointer) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[min(26vw,360px)] md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.7 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mount p-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
            {items.map(({ project }, i) =>
              project.image ? (
                <motion.img
                  key={project.slug}
                  src={project.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.12,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null
            )}
          </div>
          <div className="flex justify-between px-0.5 pt-2">
            <span className="label">{active !== null ? `Fig. ${items[active].number}` : ""}</span>
            <span className="label">{active !== null ? items[active].project.year : ""}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
