import { profile, socials } from "@/data/content";
import { scrollToAnchor } from "@/lib/useLenis";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/10 py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-sm font-bold text-ink">
            {profile.initials}
          </span>
          <p className="font-mono text-xs text-muted">
            © {year} {profile.name}. Built with React, Tailwind & a lot of motion.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToAnchor("#top")}
          className="font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
          data-cursor="magnet"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
