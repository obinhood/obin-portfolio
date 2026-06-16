import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, profile, cv } from "@/data/content";
import { scrollToAnchor } from "@/lib/useLenis";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  function go(href: string) {
    setOpen(false);
    // wait for menu close before scrolling
    setTimeout(() => scrollToAnchor(href), 10);
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[9990]"
      >
        <div
          className={`mx-auto mt-3 flex max-w-container items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? "glass mx-3 sm:mx-6 lg:mx-auto" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="group flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-sm font-bold text-ink transition-transform duration-300 group-hover:rotate-12">
              {profile.initials}
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted sm:block">
              {profile.shortName}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="group relative px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ftext"
              >
                {item.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={cv.path}
              download
              className="hidden rounded-full bg-gold px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.03] sm:inline-block"
              data-cursor="magnet"
            >
              CV
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-line/15 md:hidden"
            >
              <span
                className={`h-px w-4 bg-ftext transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-ftext transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9985] flex flex-col bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav className="container-x flex flex-1 flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl font-semibold text-ftext"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={cv.path}
                download
                className="mt-6 inline-flex w-fit rounded-full bg-gold px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] text-ink"
              >
                {cv.label}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
