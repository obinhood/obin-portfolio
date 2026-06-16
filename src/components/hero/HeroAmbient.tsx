/**
 * Ambient hero background: a soft, grainy iridescent colour wash (no sphere).
 * Large blurred blooms in the cobalt / magenta / amber-gold palette blend into
 * a vivid field that slowly drifts, with heavy grain and a dark falloff on the
 * left so the headline stays legible. Pure CSS, GPU-friendly, and the drift
 * stops under prefers-reduced-motion (handled globally).
 */
export default function HeroAmbient() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Ink base with warm/cool bleeds */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 120% at 100% -10%, rgb(245 166 35 / 0.18), transparent 50%)," +
            "radial-gradient(120% 120% at 95% 110%, rgb(43 91 255 / 0.18), transparent 56%)," +
            "rgb(var(--bg))",
        }}
      />

      {/* Drifting iridescent blooms — warm layer */}
      <div className="hero-aurora-a">
        <div
          className="hero-blob"
          style={{
            top: "-12%",
            right: "-4%",
            width: "68vmax",
            height: "68vmax",
            background: "radial-gradient(circle, rgb(245 166 35 / 0.42), transparent 64%)",
          }}
        />
        <div
          className="hero-blob"
          style={{
            top: "18%",
            right: "0%",
            width: "62vmax",
            height: "62vmax",
            background: "radial-gradient(circle, rgb(255 61 129 / 0.46), transparent 64%)",
          }}
        />
      </div>

      {/* Drifting iridescent blooms — cool layer */}
      <div className="hero-aurora-b">
        <div
          className="hero-blob"
          style={{
            bottom: "-16%",
            right: "6%",
            width: "72vmax",
            height: "72vmax",
            background: "radial-gradient(circle, rgb(43 91 255 / 0.42), transparent 66%)",
          }}
        />
        <div
          className="hero-blob"
          style={{
            top: "26%",
            right: "26%",
            width: "50vmax",
            height: "50vmax",
            background: "radial-gradient(circle, rgb(124 92 255 / 0.30), transparent 66%)",
          }}
        />
        <div
          className="hero-blob"
          style={{
            bottom: "4%",
            right: "30%",
            width: "44vmax",
            height: "44vmax",
            background: "radial-gradient(circle, rgb(79 214 194 / 0.26), transparent 66%)",
          }}
        />
      </div>

      {/* Cartographic contour texture, very subtle */}
      <div className="contours absolute inset-0 opacity-[0.16]" />

      {/* Heavy analog grain */}
      <div className="hero-noise" />

      {/* Readability: dark on the left (under the headline) and along the bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--bg)) 3%, rgb(var(--bg) / 0.45) 27%, rgb(var(--bg) / 0) 60%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
    </div>
  );
}
