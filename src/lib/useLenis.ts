import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth scrolling and wires it into GSAP's ticker so
 * ScrollTrigger stays in sync. Honours prefers-reduced-motion by
 * skipping smoothing entirely. Exposes the Lenis instance on window
 * for nav anchor scrolling.
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

    // Expose for programmatic scroll (nav links, back-to-top).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
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
