import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMedia } from "@/lib/useMedia";

// Hand-drawn 42.195 km routes. Desktop threads through the open ground right
// of the name; mobile is a short flourish in the top-right corner.
const ROUTES = {
  desktop: {
    viewBox: "0 0 1440 900",
    d: "M 1480 700 C 1400 705 1320 680 1280 620 S 1250 500 1170 470 S 1010 455 940 390 S 800 250 700 300 S 590 400 640 230 S 820 160 900 200 S 1060 300 1120 250 S 1150 150 1240 170",
    marks: [
      { at: 0.22, label: "10 KM" },
      { at: 0.5, label: "21.1 KM" },
      { at: 0.73, label: "30 KM" },
    ],
    end: 0.985,
    finishLabel: true,
  },
  mobile: {
    viewBox: "0 0 390 844",
    d: "M 420 170 C 380 175 350 160 330 200 S 340 270 300 290 S 230 260 245 225 S 300 200 320 250",
    marks: [{ at: 0.5, label: "21.1 KM" }],
    end: 0.97,
    finishLabel: false,
  },
} as const;

type Pt = { x: number; y: number };

const DRAW = { duration: 2.6, ease: [0.65, 0, 0.35, 1] as const, delay: 0.35 };

/**
 * The route: a paper casing + vermilion line that draws itself, km posts and a
 * runner. Colours use Tailwind fill/stroke classes so they follow the theme.
 */
export default function RouteLine({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const wide = useMedia("(min-width: 768px)", true);
  const route = wide ? ROUTES.desktop : ROUTES.mobile;
  const pathRef = useRef<SVGPathElement>(null);
  const [pts, setPts] = useState<{ marks: Pt[]; start: Pt; end: Pt } | null>(null);

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    const at = (f: number) => {
      const q = p.getPointAtLength(L * f);
      return { x: q.x, y: q.y };
    };
    setPts({ marks: route.marks.map((m) => at(m.at)), start: at(0.025), end: at(route.end) });
  }, [route]);

  const drawn = ready || !!reduce;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={route.viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <motion.path
        d={route.d}
        className="fill-none stroke-paper"
        strokeWidth={7}
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={DRAW}
      />
      <motion.path
        ref={pathRef}
        id="hero-route"
        d={route.d}
        className="fill-none stroke-signal/90"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={DRAW}
      />

      {pts && (
        <motion.g
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: drawn ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 2.6, duration: 0.8 }}
        >
          <circle cx={pts.start.x} cy={pts.start.y} r={5} className="fill-paper stroke-signal" strokeWidth={1.8} />
          <circle cx={pts.end.x} cy={pts.end.y} r={7} className="fill-paper stroke-ink/70" strokeWidth={1.2} />
          <circle cx={pts.end.x} cy={pts.end.y} r={3.5} className="fill-signal" />
          {route.finishLabel && (
          <text
            x={pts.end.x - 16}
            y={pts.end.y + 4}
            textAnchor="end"
            className="fill-ink-2 font-mono"
            fontSize="10"
            letterSpacing="0.12em"
          >
            FINISH · 42.195 KM
          </text>
          )}
          {pts.marks.map((m, i) => (
            <circle key={i} cx={m.x} cy={m.y} r={2.6} className="fill-paper stroke-signal" strokeWidth={1.3} />
          ))}
        </motion.g>
      )}

    </svg>
  );
}
