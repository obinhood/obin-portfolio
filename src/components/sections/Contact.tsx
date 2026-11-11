import { useState } from "react";
import { motion } from "framer-motion";
import { contact, socials } from "@/data/content";
import ContourField from "@/components/art/ContourField";
import { RichReveal } from "@/components/ui/Rich";
import Reveal from "@/components/ui/Reveal";
import { useClock } from "@/lib/useClock";
import { EASE } from "@/lib/anim";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const london = useClock("Europe/London");
  const prague = useClock("Europe/Prague");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t hair">
      <div className="absolute inset-0 -z-10">
        <ContourField seed={3} intensity={0.75} speed={0.02} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/40 to-paper" />
      </div>

      <div className="container-x flex min-h-[100svh] flex-col justify-between py-28 sm:py-36">
        <div className="flex items-center gap-4">
          <span className="label whitespace-nowrap text-ink">
            <span className="text-signal-ink">Plate 06</span>
            <span className="mx-2 text-ink-2/60">/</span>Contact
          </span>
          <motion.span
            aria-hidden
            className="ticks min-w-0 flex-1 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <span className="label hidden md:inline">You are here</span>
        </div>

        <div className="py-16">
          <RichReveal
            as="h2"
            text={contact.heading}
            className="max-w-[14ch] font-serif text-[clamp(3rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.025em] text-ink"
          />
          <Reveal className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="max-w-[40ch] text-pretty text-lg leading-relaxed text-ink/80 md:col-span-5 md:text-xl">
              {contact.body}
            </p>
            <div className="md:col-span-7 md:text-right">
              <a
                href={`mailto:${contact.email}`}
                data-cursor="hide"
                className="group inline-block font-serif text-[clamp(1.75rem,3.6vw,3.4rem)] italic leading-none text-ink"
              >
                <span className="u-link pb-1 transition-colors duration-300 group-hover:text-signal-ink">{contact.email}</span>
                <span aria-hidden className="ml-3 inline-block not-italic transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
              <div className="mt-5 md:flex md:justify-end">
                <button
                  type="button"
                  onClick={copy}
                  className="label rounded-full border hair px-4 py-2 text-ink transition-colors hover:border-ink"
                  aria-live="polite"
                >
                  {copied ? "Copied to clipboard ✓" : "Copy address"}
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="grid gap-8 border-t hair pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="label">London</span>
            <span className="mt-2 block font-serif text-3xl tabular-nums text-ink">{london}</span>
          </div>
          <div>
            <span className="label">Prague</span>
            <span className="mt-2 block font-serif text-3xl tabular-nums text-ink">{prague}</span>
          </div>
          <div className="lg:col-span-2">
            <span className="label">Elsewhere</span>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="u-link font-serif text-2xl text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
