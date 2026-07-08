import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Sets up Lenis smooth scrolling driven by a plain requestAnimationFrame loop.
 * Honours prefers-reduced-motion by skipping smoothing entirely. Exposes the
 * Lenis instance on window for programmatic scroll (nav links, modal lock).
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // Expose for programmatic scroll (nav links, back-to-top, modal lock).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);
}

/** Smoothly scroll to an in-page anchor, using Lenis when available. */
export function scrollToAnchor(href: string) {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  const el = document.querySelector(href) as HTMLElement | null;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
