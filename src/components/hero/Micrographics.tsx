import { motion } from "framer-motion";

/**
 * Subtle technical "micrographic" overlays for the hero: a hairline with circle
 * glyphs + asterisk + dot grid, a couple of mono data-labels, and a vertical
 * edge label. Decorative only (aria-hidden, pointer-events none), kept low
 * contrast so it never competes with the headline. Nods to Fox Rockett Studio's
 * micrographics, themed around cartography / mobility / data.
 */
export default function Micrographics() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] hidden md:block">
      {/* Hairline + glyphs, mid-right (sits in the orb glow) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="absolute right-[6%] top-[34%] flex items-center gap-3 text-ftext"
      >
        <svg width="208" height="26" viewBox="0 0 208 26" fill="none" className="text-ftext/70">
          <path d="M0 13 H62" stroke="currentColor" strokeWidth="1" />
          <circle cx="74" cy="13" r="7.5" stroke="currentColor" strokeWidth="1" />
          <circle cx="86" cy="13" r="7.5" stroke="currentColor" strokeWidth="1" />
          <g stroke="currentColor" strokeWidth="1">
            <path d="M112 4 V22 M103 13 H121 M105.5 6.5 L118.5 19.5 M118.5 6.5 L105.5 19.5" />
          </g>
          <g fill="currentColor">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <circle key={`${r}-${c}`} cx={150 + c * 10} cy={5 + r * 8} r="1.1" />
              ))
            )}
          </g>
          <path d="M196 13 H208" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/80">✳</span>
      </motion.div>

      {/* Data readout, clustered under the glyph line (clear of the stat strip) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute right-[6%] top-[42%] hidden flex-col items-end gap-1 lg:flex"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
          <span className="text-gold/80">◓</span>
          <span>Signal // Evolving</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/55">
          51.5074°N · 0.1278°W — London
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted/40">
          [ Electric Cartography ]
        </div>
      </motion.div>
    </div>
  );
}
