import SplitText from "./SplitText";
import Reveal from "./Reveal";

type Props = {
  index: string; // e.g. "01"
  eyebrow: string;
  title: string;
  className?: string;
};

/** Section header with micrographic framing: bracketed index, dot-grid glyph,
 *  a full-width hairline, a registration mark, then the kinetic title. */
export default function SectionHeading({ index, eyebrow, title, className = "" }: Props) {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      <Reveal className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.12em] text-gold">[ {index} ]</span>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="text-muted/50" aria-hidden>
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => <circle key={`${c}-${r}`} cx={2 + c * 6} cy={3 + r * 6} r="1" />)
          )}
        </svg>
        <span className="eyebrow whitespace-nowrap">{eyebrow}</span>
        <span className="h-px flex-1 bg-line/15" />
        <span className="font-mono text-xs text-gold/60" aria-hidden>
          ✳
        </span>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        className="font-display text-display-sm font-semibold leading-[0.95] text-ftext"
      />
    </div>
  );
}
