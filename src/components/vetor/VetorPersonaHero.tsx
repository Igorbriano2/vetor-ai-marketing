import { useEffect, useRef, useState } from "react";
import personaAsset from "@/assets/vetor-persona.png.asset.json";

export type VetorPersonaState =
  | "standby"
  | "hover"
  | "listening"
  | "thinking"
  | "speaking"
  | "executing"
  | "completed";

const STATE_LABEL: Record<VetorPersonaState, string> = {
  standby: "STANDBY",
  hover: "STANDBY",
  listening: "LISTENING",
  thinking: "THINKING",
  speaking: "SPEAKING",
  executing: "EXECUTING",
  completed: "MISSION READY",
};

type Point = {
  x: number; // 0..1
  y: number; // 0..1
  b: number; // brightness 0..1
  edge: number; // 0..1 distance-from-center factor
  seed: number;
  size: number;
};

const SAMPLE = 150;

/** Build the point cloud from the luminance of a source image (never drawn directly). */
function buildPointsFromImage(img: HTMLImageElement): Point[] {
  const c = document.createElement("canvas");
  c.width = SAMPLE;
  c.height = SAMPLE;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE);
  const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);
  const pts: Point[] = [];
  for (let y = 0; y < SAMPLE; y++) {
    for (let x = 0; x < SAMPLE; x++) {
      const i = (y * SAMPLE + x) * 4;
      const a = data[i + 3]! / 255;
      if (a < 0.35) continue;
      const lum = (0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!) / 255;
      if (lum < 0.16) continue;
      // stochastic thinning: brighter areas keep more points -> voids inside the face
      const keep = 0.16 + lum * 0.62;
      const r = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
      const rnd = Math.abs(r);
      if (rnd > keep) continue;
      const nx = x / SAMPLE;
      const ny = y / SAMPLE;
      const dx = nx - 0.5;
      const dy = ny - 0.45;
      const edge = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 0.5);
      pts.push({
        x: nx,
        y: ny,
        b: lum,
        edge,
        seed: rnd * Math.PI * 2 + x * 0.017 + y * 0.031,
        size: lum > 0.75 ? 1.7 : lum > 0.45 ? 1.25 : 0.9,
      });
    }
  }
  return pts;
}

/** Procedural fallback head/bust cloud if the source can't be sampled. */
function buildFallbackPoints(): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < 3200; i++) {
    const t = i * 2.399963;
    const rad = Math.sqrt(i / 3200);
    const nx = 0.5 + Math.cos(t) * rad * 0.22;
    const ny = 0.42 + Math.sin(t) * rad * 0.3;
    const edge = rad;
    pts.push({
      x: nx,
      y: ny,
      b: 1 - rad * 0.6,
      edge,
      seed: t,
      size: rad < 0.4 ? 1.5 : 1,
    });
  }
  return pts;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

const CYAN = { r: 60, g: 220, b: 255 };
const ICE = { r: 170, g: 235, b: 255 };
const AMBER = { r: 245, g: 197, b: 66 };

export function VetorPersonaHero({
  state = "standby",
  className = "",
}: {
  state?: VetorPersonaState;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const [ready, setReady] = useState(false);

  // sample the source image into a point cloud (image itself is never rendered)
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = personaAsset.url;
    const finish = (pts: Point[]) => {
      if (cancelled) return;
      pointsRef.current = pts.length > 400 ? pts : buildFallbackPoints();
      setReady(true);
    };
    img.onload = () => {
      try {
        finish(buildPointsFromImage(img));
      } catch {
        finish([]);
      }
    };
    img.onerror = () => finish([]);
    return () => {
      cancelled = true;
    };
  }, []);

  // subtle pointer parallax (cloud only)
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointerRef.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))),
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let hue = 0; // 0 = cyan, 1 = amber
    let running = true;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onVis = () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    const pts = pointsRef.current;
    const start = performance.now();

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      const t = reduced ? 0 : (now - start) / 1000;
      const st = stateRef.current;
      const targetHue = st === "executing" ? 1 : 0;
      hue += (targetHue - hue) * 0.04;

      const energetic = st !== "standby" && st !== "hover";
      const jitter = reduced
        ? 0
        : st === "listening"
          ? 1.6
          : st === "executing"
            ? 2.1
            : st === "thinking"
              ? 1.1
              : 0.6;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const px = reduced ? 0 : pointerRef.current.x * 6;
      const py = reduced ? 0 : pointerRef.current.y * 5;

      // scan line position (thinking / listening)
      const scanY = ((t * (st === "listening" ? 0.42 : 0.22)) % 1) * h;

      const cr = Math.round(CYAN.r + (AMBER.r - CYAN.r) * hue);
      const cg = Math.round(CYAN.g + (AMBER.g - CYAN.g) * hue);
      const cb = Math.round(CYAN.b + (AMBER.b - CYAN.b) * hue);
      const ir = Math.round(ICE.r + (AMBER.r - ICE.r) * hue);
      const ig = Math.round(ICE.g + (AMBER.g - ICE.g) * hue);
      const ib = Math.round(ICE.b + (AMBER.b - ICE.b) * hue);

      const mouthPulse =
        st === "speaking" && !reduced ? 0.5 + 0.5 * Math.sin(t * 9) : 0;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]!;
        const wob = Math.sin(t * 1.4 + p.seed) ;
        const wob2 = Math.cos(t * 1.9 + p.seed * 1.7);

        // converge field when listening
        const conv = st === "listening" && !reduced ? 0.6 * (0.5 + 0.5 * Math.sin(t * 2 + p.seed)) : 0;

        let x = p.x * w + wob * jitter + px * (0.4 + p.edge) - (p.x - 0.5) * w * conv * 0.02;
        let y = p.y * h + wob2 * jitter + py * (0.4 + p.edge) - (p.y - 0.45) * h * conv * 0.02;

        // bottom dissolves into rising data columns
        const bottom = Math.max(0, (p.y - 0.72) / 0.28);
        if (bottom > 0 && !reduced) {
          y -= ((t * 26 + p.seed * 40) % 60) * bottom;
        }

        // density / opacity
        let a = 0.18 + p.b * 0.62;
        a *= 1 - p.edge * 0.55; // edges dissolve
        a *= 1 - bottom * 0.65;
        if (energetic) a *= 1.18;
        // flicker / render-in-progress feel
        a *= 0.65 + 0.35 * Math.sin(t * (st === "thinking" ? 5 : 2.2) + p.seed * 3);
        // horizontal scanline band boost
        const dScan = Math.abs(y - scanY);
        if (dScan < 26) a += (1 - dScan / 26) * (st === "standby" ? 0.18 : 0.34);
        // mouth region pulse
        if (mouthPulse && p.y > 0.5 && p.y < 0.6 && Math.abs(p.x - 0.5) < 0.11) {
          a += mouthPulse * 0.45;
        }
        if (a <= 0.02) continue;

        const bright = p.b > 0.72;
        ctx.fillStyle = bright
          ? `rgba(${ir},${ig},${ib},${Math.min(1, a)})`
          : `rgba(${cr},${cg},${cb},${Math.min(1, a)})`;

        const s = p.size * (w / 420) * (bright ? 1.15 : 1);
        if (i % 17 === 0) {
          // occasional voxel
          ctx.fillRect(x, y, s * 2.1, s * 2.1);
        } else {
          ctx.fillRect(x, y, s, s);
        }
      }

      // free-floating data particles rising at the sides
      const count = reduced ? 0 : st === "executing" ? 60 : 34;
      for (let i = 0; i < count; i++) {
        const seed = i * 1.7;
        const x = ((Math.sin(seed * 12.1) * 0.5 + 0.5) * w);
        const speed = 14 + (i % 5) * 9;
        const y = h - (((t * speed + i * 37) % (h * 1.05)));
        const a = 0.12 + 0.2 * ((i % 4) / 4);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.fillRect(x, y, 1.4, 1.4 + (i % 3) * 2.2);
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ready, reduced]);

  const amber = state === "executing";
  const accent = amber ? "var(--op-yellow)" : "var(--cyan)";

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-square w-full select-none ${className}`}
      role="img"
      aria-label={`Presença holográfica do VETOR — estado ${STATE_LABEL[state]}`}
      data-state={state}
    >
      {/* volumetric aura */}
      <div
        className="pointer-events-none absolute inset-[8%] rounded-full blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 42%, color-mix(in oklab, ${accent} ${amber ? 26 : 18}%, transparent), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {/* background data columns */}
      <div className="persona-datacols pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />

      {/* orbital core */}
      <div
        className="pointer-events-none absolute left-1/2 top-[78%] w-[30%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="relative aspect-square">
          <div
            className="absolute inset-0 animate-spin-slow rounded-full"
            style={{ border: `1px dashed color-mix(in oklab, ${accent} 32%, transparent)` }}
          />
          <div
            className="absolute inset-[42%] animate-breathe rounded-full"
            style={{
              background: `radial-gradient(circle, ${accent}, transparent 70%)`,
              boxShadow: `0 0 22px -6px ${accent}`,
            }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[4%] flex justify-center">
        <span
          className="mono-label rounded-full border bg-background/40 px-3 py-1 backdrop-blur-sm transition-colors duration-500"
          style={{ color: accent, borderColor: `color-mix(in oklab, ${accent} 40%, transparent)` }}
        >
          {STATE_LABEL[state]}
        </span>
      </div>
    </div>
  );
}
