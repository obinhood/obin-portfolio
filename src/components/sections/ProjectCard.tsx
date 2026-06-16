import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import TiltCard from "@/components/ui/TiltCard";

const accentMap = {
  cobalt: { text: "text-cobalt", ring: "group-hover/tilt:border-cobalt", glow: "rgb(43 91 255 / 0.16)", tint: "rgb(43 91 255 / 0.09)" },
  magenta: { text: "text-magenta", ring: "group-hover/tilt:border-magenta", glow: "rgb(255 61 129 / 0.16)", tint: "rgb(255 61 129 / 0.09)" },
  gold: { text: "text-gold", ring: "group-hover/tilt:border-gold", glow: "rgb(245 166 35 / 0.16)", tint: "rgb(245 166 35 / 0.09)" },
} as const;

type Props = {
  project: Project;
  onOpen: (slug: string) => void;
  className?: string;
};

export default function ProjectCard({ project, onOpen, className = "" }: Props) {
  const accent = accentMap[project.accent];

  return (
    <TiltCard className={className} onClick={() => onOpen(project.slug)}>
      <button
        type="button"
        aria-label={`Open case study: ${project.name}`}
        className={`group/tilt relative flex h-full w-full flex-col overflow-hidden rounded-xl2 border border-line/10 bg-surface/40 p-6 text-left transition-colors ${accent.ring} sm:p-8`}
        data-cursor="magnet"
      >
        {/* resting accent glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(130% 90% at 6% 2%, ${accent.tint}, transparent 56%)` }}
        />
        {/* hover spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background: `radial-gradient(440px circle at var(--mx,50%) var(--my,50%), ${accent.glow}, transparent 60%)`,
          }}
        />
        {/* contour texture */}
        <span className="contours pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden />

        <div className="relative flex items-center justify-between">
          <span className={`font-mono text-[11px] uppercase tracking-[0.15em] ${accent.text}`}>
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full border border-line/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              Featured
            </span>
          )}
        </div>

        <div className="relative mt-auto pt-16">
          <h3 className="font-display text-3xl font-semibold leading-tight text-ftext sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 max-w-md text-pretty text-base text-muted">{project.tagline}</p>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-xs text-muted/80">
              {project.year} · {project.role}
            </span>
            <motion.span
              className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] ${accent.text}`}
            >
              Case study
              <span className="transition-transform duration-300 group-hover/tilt:translate-x-1">→</span>
            </motion.span>
          </div>
        </div>
      </button>
    </TiltCard>
  );
}
