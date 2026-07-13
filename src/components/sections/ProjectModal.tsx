import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  // Keep the latest onClose without re-running the effect (it changes identity
  // on every parent render, which would thrash focus management).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Lightbox for the screenshot gallery. A ref mirrors the state so the
  // keydown handler (bound once per open) always sees the current value.
  const [zoom, setZoom] = useState<string | null>(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  useEffect(() => {
    if (!project) return;
    setZoom(null);
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;

    // Remember what opened the dialog, freeze scroll (both native + Lenis), and
    // move focus into the dialog.
    triggerRef.current = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    // Focus the close button once the panel has committed + painted. A short
    // timeout is more reliable than a single rAF across the enter animation.
    const focusT = setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Escape closes the lightbox first, then the dialog.
        if (zoomRef.current) {
          setZoom(null);
          return;
        }
        onCloseRef.current();
        return;
      }
      // Trap Tab within the dialog (but let it flow while the lightbox is open).
      if (e.key === "Tab" && !zoomRef.current && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(focusT);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      triggerRef.current?.focus?.();
    };
  }, [project]);

  // No AnimatePresence: closing unmounts immediately (deterministic). The enter
  // animation still plays via each motion component's initial/animate.
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9995] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} />

      <motion.div
        ref={panelRef}
        data-lenis-prevent
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-xl2 border border-line/15 bg-ink-soft p-7 sm:rounded-xl2 sm:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line/15 text-muted transition-colors hover:border-magenta hover:text-magenta"
          data-cursor="magnet"
        >
          ✕
        </button>

        {project.image && (
          <div className="mb-6 overflow-hidden rounded-xl2 border border-line/10">
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="h-48 w-full object-cover sm:h-64"
            />
          </div>
        )}

        <span className={`font-mono text-xs uppercase tracking-[0.15em] ${accentText[project.accent]}`}>
          {project.category}
        </span>
        <h3 className="mt-3 font-display text-4xl font-semibold text-ftext sm:text-5xl">
          {project.name}
        </h3>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>
        <p className="mt-1 font-mono text-xs text-muted">
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

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-8 border-t border-line/10 pt-6">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
              Screens
            </span>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setZoom(src)}
                  aria-label={`Enlarge screenshot ${i + 1} of ${project.name}`}
                  className="group/shot relative overflow-hidden rounded-lg border border-line/10 bg-surface/40"
                  data-cursor="magnet"
                >
                  <img
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.05]"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

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

      {/* Screenshot lightbox */}
      {zoom && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setZoom(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <img
            src={zoom}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[95vw] rounded-lg border border-line/15 object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoom(null);
            }}
            aria-label="Close preview"
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line/20 bg-ink/60 text-ftext transition-colors hover:border-magenta hover:text-magenta"
          >
            ✕
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
