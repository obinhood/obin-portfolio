import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  letterboxd,
  goodreads,
  moviesFallback,
  booksFallback,
  interests,
  type Movie,
  type Book,
} from "@/data/content";
import { getMovies, getBooks } from "@/lib/feeds";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAura from "@/components/ui/SectionAura";
import Reveal from "@/components/ui/Reveal";
import { fadeUp, stagger, viewportOnce } from "@/lib/anim";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="text-sm text-gold" aria-label={`${rating} out of 5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
    </span>
  );
}

export default function Beyond() {
  const [movies, setMovies] = useState<Movie[]>(moviesFallback);
  const [books, setBooks] = useState<Book[]>(booksFallback);
  const [moviesLive, setMoviesLive] = useState(false);
  const [booksLive, setBooksLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    getMovies().then((m) => {
      if (mounted && m && m.length) {
        setMovies(m);
        setMoviesLive(true);
      }
    });
    getBooks().then((b) => {
      if (mounted && b && b.length) {
        setBooks(b);
        setBooksLive(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="beyond" className="relative isolate border-t border-line/10 py-24 sm:py-32">
      <SectionAura tone="magenta" align="right" />
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Beyond work" title="The other half of the picture." />

        {/* Interests */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {interests.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group rounded-xl2 border border-line/10 bg-surface/40 p-6 transition-colors hover:border-magenta/40"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-magenta">
                {it.tag}
              </span>
              <h3 className="mt-3 font-display text-xl text-ftext">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{it.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Movies */}
          <Reveal>
            <FeedHeader
              title="On screen"
              live={moviesLive}
              href={letterboxd.url}
              cta="Letterboxd"
            />
            <ul className="mt-5 divide-y divide-line/10">
              {movies.map((m, i) => (
                <li key={`${m.title}-${i}`} className="flex items-center justify-between gap-4 py-3">
                  <span className="truncate text-ftext/90">
                    {m.title}
                    {m.year && <span className="ml-2 font-mono text-xs text-muted">{m.year}</span>}
                  </span>
                  {m.rating > 0 && <Stars rating={m.rating} />}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Books */}
          <Reveal delay={0.1}>
            <FeedHeader
              title="On the shelf"
              live={booksLive}
              href={goodreads.url || "https://www.goodreads.com"}
              cta="Goodreads"
            />
            <ul className="mt-5 divide-y divide-line/10">
              {books.map((b, i) => (
                <li key={`${b.title}-${i}`} className="flex items-center justify-between gap-4 py-3">
                  <span className="min-w-0">
                    <span className="block truncate text-ftext/90">{b.title}</span>
                    {b.author && <span className="block truncate text-xs text-muted">{b.author}</span>}
                  </span>
                  {b.rating > 0 && <Stars rating={b.rating} />}
                </li>
              ))}
            </ul>
            {!goodreads.url && (
              <p className="mt-4 font-mono text-[11px] text-muted/60">
                {/* TODO: add your Goodreads profile + RSS in content.ts to go live */}
                Showing a curated list. Add your Goodreads RSS to pull this live.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeedHeader({
  title,
  live,
  href,
  cta,
}: {
  title: string;
  live: boolean;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line/10 pb-3">
      <div className="flex items-center gap-3">
        <h3 className="font-display text-2xl text-ftext">{title}</h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
            live ? "text-gold" : "text-muted/60"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-gold" : "bg-muted/40"}`} />
          {live ? "Live" : "Curated"}
        </span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold"
        data-cursor="magnet"
      >
        {cta} ↗
      </a>
    </div>
  );
}
