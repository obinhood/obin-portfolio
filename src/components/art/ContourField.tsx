import { useEffect, useRef, type MutableRefObject } from "react";
import { createNoise3D } from "@/lib/noise";

export type Sampler = (clientX: number, clientY: number) => number | null;

type Props = {
  className?: string;
  seed?: number;
  /** grid cell in CSS px; smaller = smoother lines, more work */
  cell?: number;
  /** noise frequency per CSS px */
  scale?: number;
  /** spacing between contour levels in field units */
  step?: number;
  /** drift of the terrain in noise units per second */
  speed?: number;
  /** raise a hill under the pointer */
  interactive?: boolean;
  /** overall line strength (0..1.5) */
  intensity?: number;
  /** start drawing (lets the hero wait for the intro) */
  play?: boolean;
  /** survey-style radial reveal on first draw */
  reveal?: boolean;
  /** exposes the field so the page can read "elevation" under the cursor */
  sampler?: MutableRefObject<Sampler | null>;
};

type Rgb = [number, number, number];

function readRgb(name: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  return parts.length === 3 && parts.every((n) => !Number.isNaN(n)) ? (parts as Rgb) : fallback;
}

const rgba = (c: Rgb, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/**
 * A living topographic map. Simplex-noise terrain, contoured with marching
 * squares every frame. Index contours are heavier; with `interactive` the
 * pointer raises a summit whose top rings are drawn in the route colour.
 * Pauses off-screen and in hidden tabs; draws one still frame for reduced motion.
 */
export default function ContourField({
  className = "",
  seed = 7,
  cell = 12,
  scale = 0.0017,
  step = 0.13,
  speed = 0.035,
  interactive = false,
  intensity = 1,
  play = true,
  reveal = false,
  sampler,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = createNoise3D(seed);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const live = interactive && !reduce;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let cs = cell;
    let grid = new Float32Array(0);

    let ink: Rgb = [228, 223, 212];
    let signal: Rgb = [228, 104, 70];
    let strength = 0.7;
    const readColours = () => {
      ink = readRgb("--ink", ink);
      signal = readRgb("--signal", signal);
      const s = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--contour-strength"));
      strength = Number.isFinite(s) ? s : 0.7;
    };
    readColours();

    // pointer + hill state
    let px = -9999;
    let py = -9999;
    let hx = 0;
    let hy = 0;
    let hill = 0;
    let inside = false;
    let rect = canvas.getBoundingClientRect();

    let t = seed * 3.1;
    let last = performance.now();
    let revealStart = -1;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cs = w < 768 ? Math.round(cell * 1.35) : cell;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cols = Math.ceil(w / cs) + 1;
      rows = Math.ceil(h / cs) + 1;
      grid = new Float32Array((cols + 1) * (rows + 1));
      rect = canvas.getBoundingClientRect();
      if (!live || reduce) draw(performance.now());
    };

    const sigma = () => Math.max(70, Math.min(w, h) * 0.12);

    const field = (x: number, y: number) => {
      const sx = x * scale;
      const sy = y * scale;
      let v =
        0.62 * noise(sx, sy, t) +
        0.28 * noise(sx * 2.3 + 11.3, sy * 2.3 - 7.1, t * 1.4) +
        0.1 * noise(sx * 5.1 - 3.7, sy * 5.1 + 2.9, t * 2.1);
      if (hill > 0.001) {
        const dx = x - hx;
        const dy = y - hy;
        const s = sigma();
        v += hill * 0.95 * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
      }
      return v;
    };

    if (sampler) {
      sampler.current = (clientX, clientY) => {
        const r = canvas.getBoundingClientRect();
        const x = clientX - r.left;
        const y = clientY - r.top;
        if (x < 0 || y < 0 || x > r.width || y > r.height) return null;
        return field(x, y);
      };
    }

    function draw(now: number) {
      if (!ctx || w === 0) return;
      // sample the grid
      for (let j = 0; j <= rows; j++) {
        const y = j * cs;
        for (let i = 0; i <= cols; i++) {
          grid[j * (cols + 1) + i] = field(i * cs, y);
        }
      }

      const minor = new Path2D();
      const major = new Path2D();
      const summit = new Path2D();
      const base = -1.2;
      // Contours within the cursor's hill are drawn in the route colour, so the
      // "summit" follows the pointer whatever the terrain beneath it.
      const s2 = 2 * sigma() * sigma();
      const lit = hill > 0.05;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const o = j * (cols + 1) + i;
          const v0 = grid[o];
          const v1 = grid[o + 1];
          const v2 = grid[o + cols + 2];
          const v3 = grid[o + cols + 1];
          const lo = Math.min(v0, v1, v2, v3);
          const hi = Math.max(v0, v1, v2, v3);
          const k0 = Math.ceil((lo - base) / step);
          const k1 = Math.floor((hi - base) / step);
          if (k1 < k0) continue;
          const x = i * cs;
          const y = j * cs;
          let near = false;
          if (lit) {
            const dx = x + cs / 2 - hx;
            const dy = y + cs / 2 - hy;
            near = hill * Math.exp(-(dx * dx + dy * dy) / s2) > 0.42;
          }
          for (let k = k0; k <= k1; k++) {
            const th = base + k * step;
            const c = (v0 > th ? 8 : 0) | (v1 > th ? 4 : 0) | (v2 > th ? 2 : 0) | (v3 > th ? 1 : 0);
            if (c === 0 || c === 15) continue;
            const path = near ? summit : k % 5 === 0 ? major : minor;
            const tX = x + (cs * (th - v0)) / (v1 - v0);
            const rY = y + (cs * (th - v1)) / (v2 - v1);
            const bX = x + (cs * (th - v3)) / (v2 - v3);
            const lY = y + (cs * (th - v0)) / (v3 - v0);
            const seg = (ax: number, ay: number, bx: number, by: number) => {
              path.moveTo(ax, ay);
              path.lineTo(bx, by);
            };
            switch (c) {
              case 1: case 14: seg(x, lY, bX, y + cs); break;
              case 2: case 13: seg(bX, y + cs, x + cs, rY); break;
              case 3: case 12: seg(x, lY, x + cs, rY); break;
              case 4: case 11: seg(tX, y, x + cs, rY); break;
              case 6: case 9: seg(tX, y, bX, y + cs); break;
              case 7: case 8: seg(x, lY, tX, y); break;
              case 5: seg(x, lY, tX, y); seg(bX, y + cs, x + cs, rY); break;
              case 10: seg(tX, y, x + cs, rY); seg(x, lY, bX, y + cs); break;
            }
          }
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      if (reveal && revealStart >= 0) {
        const p = Math.min(1, (now - revealStart) / 1900);
        if (p < 1) {
          const e = 1 - Math.pow(1 - p, 3);
          ctx.beginPath();
          ctx.arc(w * 0.5, h * 0.55, e * Math.hypot(w, h) * 0.62, 0, Math.PI * 2);
          ctx.clip();
        }
      }
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      const k = intensity * strength;
      ctx.strokeStyle = rgba(ink, 0.1 * k);
      ctx.lineWidth = 0.7;
      ctx.stroke(minor);
      ctx.strokeStyle = rgba(ink, 0.22 * k);
      ctx.lineWidth = 1;
      ctx.stroke(major);
      ctx.strokeStyle = rgba(signal, 0.6);
      ctx.lineWidth = 1.15;
      ctx.stroke(summit);
      ctx.restore();
    }

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!playRef.current) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (revealStart < 0) revealStart = now;
      t += dt * speed;
      // ease the hill towards the pointer
      const target = inside ? 1 : 0;
      hill += (target - hill) * Math.min(1, dt * 3.2);
      if (inside) {
        hx += (px - hx) * Math.min(1, dt * 6);
        hy += (py - hy) * Math.min(1, dt * 6);
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduce) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      if (!live) return;
      rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const was = inside;
      inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      px = x;
      py = y;
      if (inside && !was && hill < 0.05) {
        hx = x;
        hy = y;
      }
    };
    const onLeave = () => {
      inside = false;
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      readColours();
      if (reduce || !raf) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    if (reduce) {
      draw(performance.now());
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (sampler) sampler.current = null;
    };
  }, [seed, cell, scale, step, speed, interactive, intensity, reveal, sampler]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none block ${className}`} />;
}
