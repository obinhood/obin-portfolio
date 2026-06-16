/**
 * Ambient backdrop for a section: one or two large, soft, blurred colour blooms
 * plus the cartographic contour texture. Sits behind the section content (the
 * section must be `relative isolate`). The global film grain overlays these so
 * each section reads as the same grainy, gradient world as the hero.
 * Decorative only (aria-hidden, pointer-events none).
 */
type Tone = "cobalt" | "magenta" | "gold";
type Props = {
  tone?: Tone;
  align?: "left" | "right";
  className?: string;
};

const TONES: Record<Tone, [string, string]> = {
  cobalt: ["rgb(43 91 255 / 0.16)", "rgb(124 92 255 / 0.10)"],
  magenta: ["rgb(255 61 129 / 0.15)", "rgb(43 91 255 / 0.10)"],
  gold: ["rgb(245 166 35 / 0.13)", "rgb(255 61 129 / 0.10)"],
};

export default function SectionAura({ tone = "cobalt", align = "right", className = "" }: Props) {
  const [a, b] = TONES[tone];
  const main = align === "right" ? { right: "-14%" } : { left: "-14%" };
  const accent = align === "right" ? { left: "-10%" } : { right: "-10%" };

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className="absolute -top-[18%] h-[64vmax] w-[64vmax] rounded-full blur-[100px]"
        style={{ ...main, background: `radial-gradient(circle, ${a}, transparent 64%)` }}
      />
      <div
        className="absolute -bottom-[24%] h-[46vmax] w-[46vmax] rounded-full blur-[110px]"
        style={{ ...accent, background: `radial-gradient(circle, ${b}, transparent 66%)` }}
      />
      <div className="contours absolute inset-0 opacity-[0.12]" />
    </div>
  );
}
