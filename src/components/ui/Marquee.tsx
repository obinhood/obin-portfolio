import { useState } from "react";

type Props = {
  items: string[];
  className?: string;
  /** seconds for one loop */
  duration?: number;
  reverse?: boolean;
};

/**
 * Seamless marquee of serif words with small route-stop separators. The track
 * is duplicated and translated -50%, so the loop is invisible. A pause control
 * lets anyone stop the motion (WCAG 2.2.2); reduced motion stops it via CSS.
 */
export default function Marquee({ items, className = "", duration = 40, reverse = false }: Props) {
  const [paused, setPaused] = useState(false);

  const track = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-5 font-serif text-[clamp(2.25rem,5vw,4.75rem)] leading-none sm:px-8 ${
              i % 2 ? "italic text-ink-2" : "text-ink/85"
            }`}
          >
            {item}
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0 text-signal/80" aria-hidden>
            <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className={className}>
      <div
        className="relative flex overflow-hidden"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <span className="sr-only">{items.join(", ")}</span>
        <div
          className="flex animate-marquee"
          style={{
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {track}
          {track}
        </div>
      </div>
      {/* Reduced motion already stops the marquee, so the control would do nothing. */}
      <div className="container-x mt-4 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="label u-link text-ink-2 hover:text-ink"
        >
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}
