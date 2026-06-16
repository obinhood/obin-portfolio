import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAura from "@/components/ui/SectionAura";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  // --- Pinned horizontal scroll (desktop) ---
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  useEffect(() => {
    const measure = () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop || !trackRef.current) {
        setMaxX(0);
        return;
      }
      const distance = trackRef.current.scrollWidth - window.innerWidth;
      setMaxX(Math.max(0, distance + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    // re-measure after fonts settle
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const sectionHeight = maxX > 0 ? `calc(100vh + ${maxX}px)` : undefined;

  return (
    <section id="work" className="relative isolate border-t border-line/10">
      <SectionAura tone="gold" align="right" />
      {/* Heading band */}
      <div className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Things I've built, end to end."
        />
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-7 px-10"
          >
            {projects.map((p) => (
              <div key={p.slug} className="w-[min(78vw,560px)] shrink-0">
                <ProjectCard project={p} onOpen={setOpenSlug} className="h-[62vh] max-h-[560px]" />
              </div>
            ))}
            {/* end cap */}
            <div className="flex w-[40vw] shrink-0 items-center">
              <p className="font-display text-2xl text-muted">
                More on{" "}
                <a
                  href="https://github.com/obinhood/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  GitHub ↗
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical grid */}
      <div className="container-x grid gap-6 pb-24 md:hidden">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={setOpenSlug} className="min-h-[360px]" />
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpenSlug(null)} />
    </section>
  );
}
