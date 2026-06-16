import { motion } from "framer-motion";
import { profile, cv } from "@/data/content";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToAnchor } from "@/lib/useLenis";
import HeroAmbient from "./HeroAmbient";
import Micrographics from "./Micrographics";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Ambient, shaded background */}
      <div className="absolute inset-0 -z-10">
        <HeroAmbient />
      </div>

      {/* Technical micrographic overlays */}
      <Micrographics />

      <div className="container-x flex flex-1 flex-col justify-center pt-28 pb-16">
        {/* role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mb-7 flex flex-wrap items-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {profile.title} · {profile.location}
          </span>
        </motion.div>

        {/* Oversized kinetic name */}
        <h1 className="font-display font-semibold uppercase leading-[0.82] tracking-[-0.04em]">
          <SplitText
            text="Obin"
            as="span"
            delay={0.45}
            className="block text-display-xl text-ftext"
          />
          <SplitText
            text="Nguyen"
            as="span"
            delay={0.6}
            className="block text-display-xl text-gradient"
          />
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          className="mt-7 max-w-xl text-balance text-lg text-muted sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <MagneticButton variant="solid" onClick={() => scrollToAnchor("#work")}>
            View work →
          </MagneticButton>
          <MagneticButton variant="outline" href={cv.path} download>
            Download CV
          </MagneticButton>
          <MagneticButton variant="ghost" href={`mailto:${profile.email}`}>
            Say hello
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToAnchor("#work")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll to work"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line/20 p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
