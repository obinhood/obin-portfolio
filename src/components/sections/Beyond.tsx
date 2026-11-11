import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  letterboxd,
  goodreads,
  moviesFallback,
  booksFallback,
  interests,
  running,
  type Movie,
  type Book,
} from "@/data/content";
import { getMovies, getBooks } from "@/lib/feeds";
import PlateHeading from "@/components/ui/PlateHeading";
import Reveal from "@/components/ui/Reveal";
import { EASE } from "@/lib/anim";

const toSeconds = (t: string) => t.split(":").map(Number).reduce((a, n) => a * 60 + n, 0);
const fmtGap = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function Rating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-[3px]" role="img" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative h-[7px] w-[7px] overflow-hidden rounded-full border border-signal">
            <span className="absolute inset-y-0 left-0 bg-signal" style={{ width: `${fill * 100}%` }} />
          </span>
        );
      })}
    </span>
  );
}

/** Marathon block: latest time vs the sub-4 goal on a pace track. */
function Running() {
  const latest = toSeconds(running.latest.time);
  const goal = toSeconds(running.goal);
  const gap = latest - goal;
  const lo = goal - 15 * 60;
  const hi = latest + 10 * 60;
  const pos = (s: number) => `${((s - lo) / (hi - lo)) * 100}%`;

  return (
    <div className="mount h-full p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <span className="label text-signal-ink">Running</span>
        <span className="label">42.195 km</span>
      </div>
      <p className="mt-8 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.82] tabular-nums text-ink">
        {running.latest.time}
      </p>
      <p className="mt-4 text-lg text-ink">
        {running.latest.race}, {running.latest.year}.{" "}
        <span className="text-ink-2">Half marathon PB {running.halfPB}.</span>
      </p>

      {/* pace track */}
      <div className="relative mt-14 h-14" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 h-px bg-rule/25" />
        <motion.div
          className="absolute top-1/2 h-[3px] origin-right bg-signal"
          style={{ left: pos(goal), right: `calc(100% - ${pos(latest)})`, y: "-50%" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        />
        {[
          { s: goal, label: "Sub-4 goal", strong: true },
          { s: latest, label: running.latest.time, strong: false },
        ].map((m) => (
          <div key={m.label} className="absolute top-0 h-full -translate-x-1/2" style={{ left: pos(m.s) }}>
            <span className={`label absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap ${m.strong ? "text-ink" : ""}`}>
              {m.label}
            </span>
            <span
              className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-signal ${
                m.strong ? "bg-paper" : "bg-signal"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-6">
        <span className="label">{fmtGap(gap)} to find</span>
        <span className="label hidden sm:inline">Training block in progress</span>
      </div>
      <p className="mt-8 max-w-[52ch] text-pretty leading-relaxed text-ink/80">{running.note}</p>
    </div>
  );
}

function FeedHeader({ title, live, href, cta }: { title: string; live: boolean; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-ink pb-3">
      <div>
        <span className={`label inline-flex items-center gap-2 ${live ? "text-signal-ink" : ""}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-signal" : "bg-ink-2/50"}`} />
          {live ? "Live feed" : "Curated"}
        </span>
        <h3 className="mt-2 font-serif text-[2.4rem] leading-none text-ink">{title}</h3>
      </div>
      <a href={href} target="_blank" rel="noreferrer noopener" className="u-link label text-ink">
        {cta} ↗
      </a>
    </div>
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

  const notes = interests.filter((i) => i.tag !== "Running");

  return (
    <section id="beyond" className="relative border-t hair py-28 sm:py-40">
      <div className="container-x">
        <PlateHeading
          plate="05"
          label="Off the map"
          title="The other half of the *picture*."
          note="Running · cinema · community"
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Running />
          </Reveal>
          <div className="grid gap-6 lg:col-span-5">
            {notes.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08} className="border-t border-ink pt-5">
                <span className="label text-signal-ink">{it.tag}</span>
                <h3 className="mt-3 font-serif text-[2rem] leading-[1.02] text-ink">{it.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink/75">{it.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <FeedHeader title="Now showing" live={moviesLive} href={letterboxd.url} cta="Letterboxd" />
            <ol>
              {movies.map((m, i) => (
                <li
                  key={`${m.title}-${i}`}
                  className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b hair py-4"
                >
                  <span className="font-mono text-[11px] tabular-nums text-ink-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 truncate font-serif text-[1.55rem] leading-tight text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:italic">
                    {m.title}
                    {m.year && <span className="ml-3 font-mono text-[11px] not-italic text-ink-2">{m.year}</span>}
                  </span>
                  {m.rating > 0 && <Rating rating={m.rating} />}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <FeedHeader
              title="On the shelf"
              live={booksLive}
              href={goodreads.url || "https://www.goodreads.com"}
              cta="Goodreads"
            />
            <ol>
              {books.map((b, i) => (
                <li
                  key={`${b.title}-${i}`}
                  className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b hair py-4"
                >
                  <span className="font-mono text-[11px] tabular-nums text-ink-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-serif text-[1.55rem] leading-tight text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:italic">
                      {b.title}
                    </span>
                    {b.author && <span className="block truncate text-sm text-ink-2">{b.author}</span>}
                  </span>
                  {b.rating > 0 && <Rating rating={b.rating} />}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
