import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, cv, socials } from "@/data/content";
import { scrollToAnchor } from "@/lib/useLenis";
import { useClock } from "@/lib/useClock";
import { EASE } from "@/lib/anim";
import ThemeToggle from "./ThemeToggle";

export default function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const time = useClock("Europe/London");
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Solid on scroll; tucks away when scrolling down, returns on the way up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide only on a real downward step, show only on a real upward one, so
      // Lenis' easing tail (tiny per-frame deltas) doesn't flick the bar back in.
      // Never tuck it away while a keyboard user is inside it.
      const keyboardIn = !!headerRef.current?.querySelector(":focus-visible");
      if (y < 200 || y < lastY - 2) setHidden(false);
      else if (y > lastY + 2 && !keyboardIn) setHidden(true);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view.
  useEffect(() => {
    // Watch the intro plates too, so nothing is highlighted while they're in view.
    const targets = ["#top", "#statement", ...nav.map((n) => n.href)];
    const els = targets.map((h) => document.querySelector(h)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    // While the menu covers the page, take the page out of the tab order.
    const behind = document.querySelectorAll("main, footer");
    behind.forEach((el) => el.toggleAttribute("inert", open));
    // Only while the menu is open: Escape elsewhere (e.g. a case study) is not ours.
    const onKey = (e: KeyboardEvent) => {
      if (!open || e.key !== "Escape") return;
      setOpen(false);
      menuBtnRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function go(href: string) {
    setOpen(false);
    setTimeout(() => scrollToAnchor(href), 30);
  }

  return (
    <>
      <motion.header
        ref={headerRef}
        onFocusCapture={(e) => (e.target as Element).matches(":focus-visible") && setHidden(false)}
        initial={{ y: -90 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -90 }}
        transition={{ duration: 0.7, ease: EASE, delay: ready && !scrolled ? 0.5 : 0 }}
        className="fixed inset-x-0 top-0 z-[9990]"
      >
        <div
          className={`border-b transition-colors duration-500 ${
            scrolled && !open ? "hair bg-paper/80 backdrop-blur-md" : "border-transparent"
          }`}
        >
          <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-[72px]">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                go("#top");
              }}
              className="group flex items-baseline gap-2"
              aria-label="Obin Nguyen, back to top"
            >
              <span className="font-serif text-[1.6rem] leading-none text-ink">
                Obin <em className="transition-colors duration-300 group-hover:text-signal">Nguyen</em>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    <span className="mr-1.5 text-ink-2">{item.index}</span>
                    {item.label}
                    <span
                      className={`absolute inset-x-3 bottom-1 h-px origin-left bg-signal transition-transform duration-500 ease-expo ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="label hidden tabular-nums xl:inline">London {time}</span>
              <ThemeToggle />
              <a
                href={cv.path}
                download
                className="label hidden rounded-full bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-signal-ink sm:inline-block"
              >
                CV ↓
              </a>
              <button
                ref={menuBtnRef}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
                className="label rounded-full border hair px-4 py-2.5 text-ink lg:hidden"
              >
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9985] flex flex-col bg-paper pt-20 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + 0.06 * i, duration: 0.7, ease: EASE }}
                  className="flex items-baseline gap-4 border-b hair py-3"
                >
                  <span className="font-mono text-xs text-signal-ink">{item.index}</span>
                  <span className="font-serif text-[clamp(2.8rem,12vw,4.5rem)] leading-none text-ink">{item.label}</span>
                </motion.a>
              ))}
            </nav>
            <div className="container-x flex flex-wrap items-center justify-between gap-4 pb-8 pt-6">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="label text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <a href={cv.path} download className="label rounded-full bg-ink px-5 py-3 text-paper">
                {cv.label} ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
