import { motion } from "framer-motion";
import { contact, socials, profile } from "@/data/content";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line/10 py-28 sm:py-40">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--magenta)) 0%, rgb(var(--cobalt)) 45%, transparent 70%)",
        }}
      />
      <div className="contours absolute inset-0 opacity-20" aria-hidden />

      <div className="container-x relative text-center">
        <Reveal className="eyebrow mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-line/20" />
          <span>Contact</span>
          <span className="h-px w-8 bg-line/20" />
        </Reveal>

        <SplitText
          as="h2"
          text={contact.heading}
          className="mx-auto font-display text-display font-semibold text-ftext"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted"
        >
          {contact.body}
        </motion.p>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton variant="solid" href={`mailto:${contact.email}`} className="!px-8 !py-4">
            {contact.email}
          </MagneticButton>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="font-mono text-sm uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold"
              data-cursor="magnet"
            >
              {s.label}
            </a>
          ))}
        </Reveal>

        <p className="mt-16 font-mono text-xs text-muted/60">
          {profile.location} · {profile.title}
        </p>
      </div>
    </section>
  );
}
