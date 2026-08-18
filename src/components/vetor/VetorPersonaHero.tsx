import { useEffect, useMemo, useRef, useState } from "react";
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

const AMBER_STATES: VetorPersonaState[] = ["executing"];

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

function useDocumentVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible;
}

export function VetorPersonaHero({
  state = "standby",
  className = "",
}: {
  state?: VetorPersonaState;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const pageVisible = useDocumentVisible();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    setPointerFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const parallaxOn = pointerFine && !reduced;

  useEffect(() => {
    if (!parallaxOn) return;
    const el = wrapRef.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        setTilt({
          x: Math.max(-1, Math.min(1, nx)),
          y: Math.max(-1, Math.min(1, ny)),
        });
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [parallaxOn]);

  const amber = AMBER_STATES.includes(state);
  const accent = amber ? "var(--op-yellow)" : "var(--cyan)";
  const energetic = state !== "standby" && state !== "hover";
  const animate = !reduced && pageVisible;

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        delay: (i % 11) * 0.55,
        dur: 6 + (i % 5) * 1.6,
        size: i % 4 === 0 ? 3 : 2,
      })),
    [],
  );

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-square w-full select-none ${className}`}
      role="img"
      aria-label={`Presença holográfica do VETOR — estado ${STATE_LABEL[state]}`}
      data-state={state}
    >
      {/* aura */}
      <div
        className={`absolute inset-[6%] rounded-full blur-3xl transition-all duration-700 ${animate ? "animate-breathe" : ""}`}
        style={{
          background: `radial-gradient(circle at 50% 42%, color-mix(in oklab, ${accent} ${energetic ? 34 : 22}%, transparent), transparent 68%)`,
        }}
        aria-hidden="true"
      />

      {/* colunas de dados de fundo */}
      <div className="persona-datacols pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* persona */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: parallaxOn
            ? `translate3d(${tilt.x * -8}px, ${tilt.y * -6}px, 0)`
            : undefined,
        }}
        aria-hidden="true"
      >
        <div className={`persona-figure relative size-full ${animate ? "animate-persona-breathe" : ""}`}>
          <img
            src={personaAsset.url}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-top mix-blend-screen transition-[filter] duration-700"
            style={{
              maskImage:
                "radial-gradient(70% 78% at 50% 44%, #000 55%, transparent 88%)",
              WebkitMaskImage:
                "radial-gradient(70% 78% at 50% 44%, #000 55%, transparent 88%)",
              filter: amber
                ? "hue-rotate(-155deg) saturate(1.25) contrast(1.08) brightness(1.05)"
                : `saturate(${energetic ? 1.2 : 1}) contrast(1.05) brightness(${energetic ? 1.08 : 0.98})`,
            }}
          />
          {/* grade digital + scanlines */}
          <div className="persona-grid pointer-events-none absolute inset-0" />
          <div
            className={`persona-scanlines pointer-events-none absolute inset-0 ${animate ? "animate-scanline-drift" : ""}`}
          />
          {/* scan vertical (thinking) */}
          {state === "thinking" && animate && (
            <div className="persona-scanbeam pointer-events-none absolute inset-0" />
          )}
          {/* pulso de fala */}
          {state === "speaking" && animate && (
            <div className="pointer-events-none absolute inset-0 animate-breathe rounded-full"
              style={{ background: `radial-gradient(45% 30% at 50% 58%, color-mix(in oklab, ${accent} 22%, transparent), transparent 70%)` }}
            />
          )}
        </div>
      </div>

      {/* partículas */}
      {animate && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className={`absolute rounded-[1px] ${state === "listening" ? "animate-particle-converge" : "animate-particle-float"} hidden sm:block`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                background: accent,
                opacity: 0.5,
                animationDelay: `${p.delay}s`,
                animationDuration: `${state === "executing" ? p.dur * 0.55 : p.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* núcleo orbital no peito */}
      <div
        className="pointer-events-none absolute left-1/2 top-[72%] w-[42%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="relative aspect-square">
          <div
            className={`absolute inset-0 rounded-full ${animate ? "animate-spin-slow" : ""}`}
            style={{ border: `1px dashed color-mix(in oklab, ${accent} 40%, transparent)` }}
          />
          <div
            className={`absolute inset-[18%] rounded-full ${animate ? "animate-spin-slower" : ""}`}
            style={{ border: `1px solid color-mix(in oklab, ${accent} 28%, transparent)` }}
          />
          <div
            className={`absolute inset-[38%] rounded-full ${animate ? "animate-breathe" : ""}`}
            style={{
              background: `radial-gradient(circle, ${accent}, color-mix(in oklab, ${accent} 10%, transparent) 70%)`,
              boxShadow: `0 0 30px -6px ${accent}`,
            }}
          />
        </div>
      </div>

      {/* estado */}
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
