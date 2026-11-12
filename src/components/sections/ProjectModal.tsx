import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { accentBg, accentText } from "./FeaturedProject";
import { EASE } from "@/lib/anim";

type Props = {
  project: Project | null;
  number: string;
  total: number;
  next: Project | null;
  prev: Project | null;
  onNavigate: (slug: string) => void;
  onClose: () => void;
};

const STAGES = [
  { key: "problem" as const, label: "The problem" },
  { key: "approach" as const, label: "The approach" },
  { key: "result" as const, label: "Where it landed" },
];

/**
 * Full-screen case study sheet. Deliberately no AnimatePresence: closing
 * unmounts synchronously, so no invisible overlay can be left behind.
 */
export default function ProjectModal({ project, number, total, next, prev, onNavigate, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState<string | null>(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const zoomCloseRef = useRef<HTMLButtonElement>(null);
  const zoomTriggerRef = useRef<HTMLElement | null>(null);

  // Close the lightbox and hand focus back to the screenshot that opened it.
  const closeZoom = () => {
    setZoom(null);
    // The opener lives in the sheet, not the lightbox, so it can take focus right away.
    zoomTriggerRef.current?.focus({ preventScroll: true });
  };
  const closeZoomRef = useRef(closeZoom);
  closeZoomRef.current = closeZoom;

  const isOpen = project !== null;

  // Open/close lifecycle: lock scroll, manage focus, keyboard.
  useEffect(() => {
    if (!isOpen) return;
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    triggerRef.current = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const focusT = setTimeout(() => closeRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomRef.current) {
          closeZoomRef.current();
          return;
        }
        onCloseRef.current();
        return;
      }
      // While the lightbox is open its Close button is the only stop.
      if (e.key === "Tab" && zoomRef.current) {
        e.preventDefault();
        zoomCloseRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        // Only count controls that are actually rendered (Prev/Next hide on phones).
        const items = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.getClientRects().length > 0);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        // Focus on nothing in particular (e.g. after clicking plain text): pull it back in.
        if (!panelRef.current.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
          return;
        }
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
      triggerRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (zoom) zoomCloseRef.current?.focus();
  }, [zoom]);

  // Switching case studies: back to the top of the sheet.
  useEffect(() => {
    if (!project) return;
    setZoom(null);
    panelRef.current?.scrollTo({ top: 0 });
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      ref={panelRef}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
      className="fixed inset-0 z-[9995] overflow-y-auto bg-paper"
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* top bar */}
      <div className="sticky top-0 z-10 border-b hair bg-paper/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <span className="label text-ink">
            Case study <span className="tabular-nums text-signal-ink">{number}</span>
            <span className="text-ink-2"> / {String(total).padStart(2, "0")}</span>
          </span>
          <div className="flex items-center gap-2">
            {prev && (
              <button
                type="button"
                onClick={() => onNavigate(prev.slug)}
                className="label hidden rounded-full border hair px-4 py-2 text-ink transition-colors hover:border-ink sm:inline-block"
              >
                ← Prev
              </button>
            )}
            {next && (
              <button
                type="button"
                onClick={() => onNavigate(next.slug)}
                className="label hidden rounded-full border hair px-4 py-2 text-ink transition-colors hover:border-ink sm:inline-block"
              >
                Next →
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="label rounded-full bg-ink px-4 py-2 text-paper transition-colors hover:bg-signal-ink"
            >
              Close ✕
            </button>
          </div>
        </div>
      </div>

      <motion.div
        key={project.slug}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        className="container-x pb-10 pt-12 sm:pt-20"
      >
        {/* header */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className={`h-px w-8 ${accentBg[project.accent]}`} />
              <span className={`label ${accentText[project.accent]}`}>{project.category}</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.9] tracking-[-0.025em] text-ink">
              {project.name}
            </h2>
            <p className="mt-6 max-w-[36ch] text-pretty text-xl leading-snug text-ink/80 sm:text-2xl">
              {project.tagline}
            </p>
          </div>
          <dl className="self-end border-t hair lg:col-span-3 lg:col-start-10">
            {[
              ["Year", project.year],
              ["Role", project.role],
              ["Type", project.category],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-3 border-b hair py-3">
                <dt className="label pt-0.5">{k}</dt>
                <dd className="text-[15px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {project.image && (
          <figure className="mount mt-14 p-2 sm:p-3">
            <img
              src={project.image}
              alt={`${project.name} cover`}
              className="max-h-[78vh] w-full bg-paper-2 object-cover object-top"
            />
          </figure>
        )}

        {/* narrative */}
        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {STAGES.map((s, i) => (
            <div key={s.key} className="border-t border-ink pt-5">
              <span className="label text-ink">
                <span className="text-signal-ink">0{i + 1}</span> · {s.label}
              </span>
              <p
                className={`mt-5 text-pretty leading-relaxed text-ink/85 ${
                  i === 0 ? "font-serif text-[1.65rem] leading-[1.2] text-ink" : "text-[17px]"
                }`}
              >
                {project[s.key]}
              </p>
            </div>
          ))}
        </div>

        {/* gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24">
            <span className="label">Plates · screens from the build</span>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
              {project.gallery.map((src, i) => {
                // With an odd count the first plate spans both columns, so it gets a wide frame.
                const wide = i === 0 && project.gallery!.length % 2 === 1;
                return (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    zoomTriggerRef.current = e.currentTarget;
                    setZoom(src);
                  }}
                  aria-label={`Enlarge screenshot ${i + 1} of ${project.name}`}
                  data-cursor="zoom"
                  className={`mount group block p-2 text-left ${wide ? "sm:col-span-2" : ""}`}
                >
                  <div className="overflow-hidden bg-paper-2">
                    <img
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      loading="lazy"
                      className={`${wide ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3]"} w-full object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]`}
                    />
                  </div>
                  <span className="label mt-2 block px-0.5">Fig. {number}.{i + 1}</span>
                </button>
                );
              })}
            </div>
          </div>
        )}

        {/* stack + links */}
        <div className="mt-20 grid gap-10 border-t hair pt-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="label">Built with</span>
            <p className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight text-ink">
              {project.stack.map((t, i) => (
                <span key={t}>
                  {t}
                  {i < project.stack.length - 1 && (
                    <>
                      <span className="mx-2 text-signal">/</span>
                      <wbr />
                    </>
                  )}
                </span>
              ))}
            </p>
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap items-start gap-3 md:col-span-4 md:justify-end">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label rounded-full bg-ink px-5 py-3 text-paper transition-colors hover:bg-signal-ink"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* next */}
        {next && (
          <button
            type="button"
            onClick={() => onNavigate(next.slug)}
            className="group mt-28 block w-full border-t border-ink pt-6 text-left"
          >
            <span className="label">Next case study →</span>
            <span className="mt-3 block font-serif text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.9] text-ink transition-transform duration-700 ease-expo group-hover:translate-x-4 group-hover:italic">
              {next.name}
            </span>
          </button>
        )}
      </motion.div>

      {/* lightbox */}
      {zoom && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-paper/95 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeZoom}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <motion.img
            src={zoom}
            alt={`${project.name} screenshot ${(project.gallery?.indexOf(zoom) ?? 0) + 1}, enlarged`}
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="mount max-h-[90vh] max-w-[94vw] object-contain p-2"
          />
          <button
            ref={zoomCloseRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeZoom();
            }}
            aria-label="Close preview"
            className="label absolute right-5 top-5 rounded-full bg-ink px-4 py-2 text-paper hover:bg-signal-ink"
          >
            Close ✕
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
