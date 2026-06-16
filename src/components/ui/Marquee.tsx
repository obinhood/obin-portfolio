type Props = {
  items: string[];
  className?: string;
  /** seconds for one loop */
  duration?: number;
  reverse?: boolean;
};

/**
 * Seamless infinite marquee. The track is duplicated and translated -50%, so
 * the loop is invisible. Pauses on hover.
 */
export default function Marquee({ items, className = "", duration = 32, reverse = false }: Props) {
  const track = (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-display text-2xl text-ftext/80 sm:text-4xl">{item}</span>
          <span className="text-gold">✳</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className="flex animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
