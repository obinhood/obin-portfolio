import { useState } from "react";
import { projects } from "@/data/projects";
import PlateHeading from "@/components/ui/PlateHeading";
import Reveal from "@/components/ui/Reveal";
import FeaturedProject from "./FeaturedProject";
import ProjectIndex from "./ProjectIndex";
import ProjectModal from "./ProjectModal";

const LAYOUTS = ["wide", "left", "right"] as const;

export default function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Featured first, then the rest, numbered as one continuous atlas.
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
  const numbered = ordered.map((project, i) => ({ project, number: String(i + 1).padStart(2, "0") }));
  const featured = numbered.filter((n) => n.project.featured);
  const rest = numbered.filter((n) => !n.project.featured);

  const openIndex = ordered.findIndex((p) => p.slug === openSlug);
  const open = openIndex >= 0 ? ordered[openIndex] : null;

  return (
    <section id="work" className="relative border-t hair py-28 sm:py-40">
      <div className="container-x">
        <PlateHeading
          plate="02"
          label="Selected work"
          title="Things I've *designed, built* and shipped."
          note={`${ordered.length} entries · 2018 to now`}
        />

        <div className="space-y-28 sm:space-y-40">
          {featured.map((f, i) => (
            <FeaturedProject
              key={f.project.slug}
              project={f.project}
              number={f.number}
              layout={LAYOUTS[i % LAYOUTS.length]}
              onOpen={setOpenSlug}
            />
          ))}
        </div>

        <div className="mt-32 sm:mt-44">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-serif text-[clamp(2.2rem,3.6vw,3.5rem)] leading-none text-ink">
              The full <em>index</em>
            </h3>
            <p className="max-w-sm text-pretty text-ink-2">
              Products, prototypes and research, each written up from the real repo: what the problem was, how I
              approached it and where it landed.
            </p>
          </Reveal>
          <ProjectIndex items={rest} onOpen={setOpenSlug} />
          <Reveal className="mt-10 flex justify-end">
            <a
              href="https://github.com/obinhood/"
              target="_blank"
              rel="noreferrer noopener"
              className="u-link label text-ink"
            >
              More on GitHub ↗
            </a>
          </Reveal>
        </div>
      </div>

      <ProjectModal
        project={open}
        number={openIndex >= 0 ? numbered[openIndex].number : ""}
        total={ordered.length}
        next={open ? ordered[(openIndex + 1) % ordered.length] : null}
        prev={open ? ordered[(openIndex - 1 + ordered.length) % ordered.length] : null}
        onNavigate={setOpenSlug}
        onClose={() => setOpenSlug(null)}
      />
    </section>
  );
}
