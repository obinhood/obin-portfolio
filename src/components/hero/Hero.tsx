import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile, cv } from "@/data/content";
import ContourField, { type Sampler } from "@/components/art/ContourField";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToAnchor } from "@/lib/useLenis";
import { EASE } from "@/lib/anim";
import RouteLine from "./RouteLine";
import { NorthArrow, ScaleBar } from "./MapMarks";

// Greater London, roughly: the hero plate maps onto this box.
const BBOX = { north: 51.62, south: 51.4, west: -0.36, east: 0.1 };

function fmtLat(v: number) {
  return `${Math.abs(v).toFixed(4)}° ${v >= 0 ? "N" : "S"}`;
}
function fmtLon(v: number) {
  return `${Math.abs(v).toFixed(4)}° ${v >= 0 ? "E" : "W"}`;
}

/** Live map readout: where the cursor is "standing" and how high. */
function Readout({ sampler }: { sampler: React.MutableRefObject<Sampler | null> }) {
  const [state, setState] = useState<{ lat: number; lon: number; elev: number | null }>({
    lat: profile.coords.lat,
    lon: profile.coords.lon,
    elev: null,
  });

  useEffect(() => {
    let raf = 0;
    let ev: PointerEvent | null = null;
    const flush = () => {
      raf = 0;
      if (!ev) return;
      const v = sampler.current?.(ev.clientX, ev.clientY) ?? null;
      if (v === null) {
        setState({ lat: profile.coords.lat, lon: profile.coords.lon, elev: null });
        return;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const lat = BBOX.north - (ev.clientY / h) * (BBOX.north - BBOX.south);
      const lon = BBOX.west + (ev.clientX / w) * (BBOX.east - BBOX.west);
      setState({ lat, lon, elev: Math.max(0, Math.round((v + 1.2) * 38)) });
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ev = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [sampler]);

  return (
    <div className="label text-right tabular-nums text-ink" aria-hidden>
      <span>{fmtLat(state.lat)}</span>
      <span className="mx-2 text-ink-2/50">·</span>
      <span>{fmtLon(state.lon)}</span>
      <span className="mt-1 block text-ink-2">
        {state.elev === null ? "London · move to survey" : `Elev. ${state.elev} m`}
      </span>
    </div>
  );
}

function Letters({ word, delay, ready, className = "" }: { word: string; delay: number; ready: boolean; className?: string }) {
  return (
    <span aria-hidden className={`-mb-[0.24em] inline-flex overflow-hidden pb-[0.24em] pr-[0.04em] ${className}`}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: ready ? "0%" : "105%" }}
          transition={{ duration: 1.15, ease: EASE, delay: delay + i * 0.055 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const sampler = useRef<Sampler | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const rise = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <section ref={sectionRef} id="top" className="relative isolate min-h-[100svh] overflow-hidden" aria-label="Introduction">
      <div className="absolute inset-0 -z-10">
        <ContourField interactive reveal play={ready} sampler={sampler} seed={11} className="absolute inset-0" />
      </div>
      <RouteLine ready={ready} />

      <div className="container-x relative flex min-h-[100svh] flex-col pb-7 pt-24 sm:pt-28">
        {/* top meta */}
        <motion.div {...rise(0.1)} className="flex items-start justify-between gap-6">
          <div className="label text-ink">
            <span className="text-signal-ink">Plate 00</span>
            <span className="mx-2 text-ink-2/60">/</span>Cover
            <span className="mt-1 block text-ink-2">An atlas of work, 2017 to now</span>
          </div>
          <div className="hidden md:block">
            <Readout sampler={sampler} />
          </div>
        </motion.div>

        {/* the name */}
        <motion.div style={{ y: nameY, opacity: fade }} className="flex flex-1 flex-col justify-center py-10">
          <h1 className="font-serif text-mega text-ink">
            <span className="sr-only">
              {profile.first} {profile.last}, {profile.title}
            </span>
            <span className="flex items-start">
              <Letters word={profile.first} delay={0.15} ready={ready} />
              <motion.sup
                {...rise(1.1)}
                aria-hidden
                className="ml-3 mt-[0.32em] font-mono text-[11px] tracking-[0.14em] text-signal-ink sm:text-xs"
              >
                (1)
              </motion.sup>
            </span>
            <span className="block pl-[9vw] sm:pl-[14vw]">
              <Letters word={profile.last} delay={0.35} ready={ready} className="italic" />
            </span>
          </h1>
        </motion.div>

        {/* bottom row */}
        <div className="grid items-end gap-8 md:grid-cols-12">
          <motion.p
            {...rise(0.7)}
            className="max-w-[26ch] text-pretty text-[1.35rem] leading-[1.25] tracking-[-0.01em] text-ink sm:text-[1.75rem] md:col-span-6 lg:col-span-5"
          >
            {profile.headline}
          </motion.p>

          <motion.div {...rise(0.85)} className="md:col-span-3 lg:col-span-3 lg:col-start-7">
            <span className="label">Currently</span>
            <ul className="mt-3 space-y-1.5">
              {profile.currently.map((c) => (
                <li key={c.org} className="flex items-baseline gap-3 text-ink">
                  <span className="relative top-[-2px] h-1.5 w-1.5 shrink-0 self-center rounded-full bg-signal" />
                  <span className="font-serif text-[1.35rem] italic leading-none">{c.org}</span>
                  <span className="label">{c.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...rise(1)} className="flex flex-wrap gap-3 md:col-span-3 md:justify-end lg:col-span-3">
            <MagneticButton variant="solid" onClick={() => scrollToAnchor("#work")}>
              Selected work <span aria-hidden>↓</span>
            </MagneticButton>
            <MagneticButton variant="outline" href={cv.path} download>
              CV <span aria-hidden>↗</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* map furniture */}
        <motion.div
          {...rise(1.2)}
          className="mt-8 flex items-center justify-between gap-6 border-t hair pt-4"
        >
          <div className="flex items-center gap-5">
            <NorthArrow />
            <ScaleBar className="hidden sm:block" />
          </div>
          <p className="label hidden text-center lg:block">
            (1) Le Nghia Nguyen, known as Obin. Czech-Vietnamese, raised in Prague.
          </p>
          <button
            type="button"
            onClick={() => scrollToAnchor("#statement")}
            className="label group flex items-center gap-2 text-ink transition-colors hover:text-signal-ink"
          >
            Scroll to explore
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-y-1">
              ↓
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
