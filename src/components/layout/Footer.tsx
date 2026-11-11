import { motion } from "framer-motion";
import { nav, profile, socials, cv } from "@/data/content";
import { scrollToAnchor } from "@/lib/useLenis";
import { EASE } from "@/lib/anim";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t hair bg-paper-2 text-ink">
      <div className="container-x grid gap-12 pb-10 pt-20 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">Colophon</span>
          <p className="mt-4 max-w-[34ch] text-pretty leading-relaxed text-ink/80">
            Set in Instrument Serif, Geist and Geist Mono. Contours are drawn live on canvas from simplex noise; the
            route is 42.195 km, give or take. Built with React, Tailwind and Framer Motion.
          </p>
        </div>
        <div className="lg:col-span-2 lg:col-start-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">Index</span>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor(n.href);
                  }}
                  className="u-link text-ink/80 hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={cv.path} download className="u-link text-ink/80 hover:text-ink">
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">Elsewhere</span>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="u-link text-ink/80 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2 lg:text-right">
          <button
            type="button"
            onClick={() => scrollToAnchor("#top")}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:text-ink"
          >
            Back to the start ↑
          </button>
        </div>
      </div>

      <div className="container-x flex flex-wrap justify-between gap-4 border-t border-rule/10 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
        <span>
          © {year} {profile.name}
        </span>
        <span>51.5072° N · 0.1276° W</span>
      </div>

      <motion.p
        aria-hidden
        initial={{ y: "40%" }}
        whileInView={{ y: "18%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
        className="pointer-events-none select-none whitespace-nowrap px-3 text-center font-serif text-[19.5vw] leading-[0.8] tracking-[-0.04em] text-ink/[0.08]"
      >
        Obin <em>Nguyen</em>
      </motion.p>
    </footer>
  );
}
