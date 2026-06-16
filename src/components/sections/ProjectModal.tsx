import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/content";

const accentText = {
  cobalt: "text-cobalt",
  magenta: "text-magenta",
  gold: "text-gold",
} as const;

type Props = {
  project: Project | null;
  onClose: () => void;
};

const stage = [
  { key: "problem" as const, label: "Problem" },
  { key: "approach" as const, label: "Approach" },
  { key: "result" as const, label: "Result" },
];

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (project) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9995] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-xl2 border border-line/15 bg-ink-soft p-7 sm:rounded-xl2 sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line/15 text-muted transition-colors hover:border-magenta hover:text-magenta"
              data-cursor="magnet"
            >
              ✕
            </button>

            <span className={`font-mono text-xs uppercase tracking-[0.15em] ${accentText[project.accent]}`}>
              {project.category}
            </span>
            <h3 className="mt-3 font-display text-4xl font-semibold text-ftext sm:text-5xl">
              {project.name}
            </h3>
            <p className="mt-2 text-lg text-muted">{project.tagline}</p>
            <p className="mt-1 font-mono text-xs text-muted/70">
              {project.year} · {project.role}
            </p>

            <div className="mt-8 space-y-6">
              {stage.map((s) => (
                <div key={s.key} className="grid gap-1.5 sm:grid-cols-[120px_1fr] sm:gap-6">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
                    {s.label}
                  </span>
                  <p className="text-pretty leading-relaxed text-ftext/85">{project[s.key]}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-line/10 pt-6">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Stack</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line/10 bg-surface/50 px-3 py-1 font-mono text-[11px] text-ftext/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.03]"
                    data-cursor="magnet"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
