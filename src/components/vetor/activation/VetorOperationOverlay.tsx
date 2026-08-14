import { useEffect, useRef, type CSSProperties } from "react";
import {
  AGENTS,
  CONTEXT_UNITS,
  OPERATION_STEPS,
  OPPORTUNITIES,
  STEP_META,
  type OperationStep,
  type VetorActivationState,
} from "./types";

type Props = {
  state: VetorActivationState;
  origin: { x: number; y: number };
  activeOperationStep: OperationStep | null;
  canSkipAnimation: boolean;
  prefersReducedMotion: boolean;
  onSkip: () => void;
  onClose: () => void;
};

const STATUS_LINES: Partial<Record<VetorActivationState, string[]>> = {
  command_received: ["COMANDO RECEBIDO", "COMMAND RECEIVED"],
  core_expanding: ["VETOR CORE // EXPANDING", "SYSTEM FIELD // ENGAGED"],
  operation_mode: ["VETOR // OPERATION MODE", "SISTEMA ATIVO"],
};

function OperationCore({ intense }: { intense: boolean }) {
  return (
    <div className="pointer-events-none relative mx-auto aspect-square w-full max-w-[min(78vw,30rem)]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-[18%] rounded-full border animate-ring-out"
          style={{
            borderColor: "color-mix(in oklab, var(--op-ink) 30%, transparent)",
            animationDelay: `${i * 1.05}s`,
          }}
          aria-hidden="true"
        />
      ))}
      <svg viewBox="0 0 400 400" className="relative size-full" aria-hidden="true">
        <defs>
          <radialGradient id="op-core">
            <stop offset="0%" stopColor="var(--op-warm-white)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="var(--op-yellow-lum)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--op-amber-deep)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke="var(--op-ink)" strokeOpacity="0.16" fill="none">
          <circle cx="200" cy="200" r="192" />
          <circle cx="200" cy="200" r="150" />
          <line x1="200" y1="8" x2="200" y2="392" />
          <line x1="8" y1="200" x2="392" y2="200" />
        </g>
        <g style={{ transformOrigin: "200px 200px" }} className="animate-spin-slow">
          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="64"
            fill="none"
            stroke="var(--op-ink)"
            strokeOpacity="0.35"
            strokeDasharray="3 10"
          />
          <circle cx="370" cy="200" r="5" fill="var(--op-ink)" />
        </g>
        <g
          style={{ transformOrigin: "200px 200px", transform: "rotate(-38deg)" }}
          className="animate-spin-slower"
        >
          <ellipse
            cx="200"
            cy="200"
            rx="126"
            ry="126"
            fill="none"
            stroke="var(--op-warm-white)"
            strokeOpacity="0.55"
          />
          <circle cx="326" cy="200" r="4" fill="var(--op-warm-white)" />
        </g>
        <g
          fill="none"
          stroke="var(--op-ink)"
          strokeOpacity={intense ? 0.5 : 0.25}
          strokeDasharray="14 210"
          className="animate-dash"
        >
          <circle cx="200" cy="200" r="98" />
          <circle cx="200" cy="200" r="132" />
        </g>
        <circle cx="200" cy="200" r="82" fill="url(#op-core)" className="animate-breathe" />
        <circle cx="200" cy="200" r="44" fill="none" stroke="var(--op-ink)" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="22" fill="var(--op-ink)" fillOpacity="0.9" />
        <path
          d="M182 194l14 20 24-36"
          fill="none"
          stroke="var(--op-warm-white)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StepPanel({ step }: { step: OperationStep }) {
  const meta = STEP_META[step];
  return (
    <div className="animate-pop-in">
      <p className="font-mono text-[0.65rem] tracking-[0.24em] text-[var(--op-ink)]/60">
        {meta.code}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-[var(--op-ink)] sm:text-2xl">{meta.title}</h3>

      {step === "loading_context" ? (
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CONTEXT_UNITS.map((u, i) => (
            <li
              key={u}
              className="animate-stream-in rounded-lg border border-[var(--op-ink)]/20 bg-[var(--op-warm-white)]/45 px-3 py-2 font-mono text-[0.6rem] tracking-[0.14em] text-[var(--op-ink)]"
              style={
                {
                  animationDelay: `${i * 110}ms`,
                  "--sx": `${i % 2 ? "-24px" : "24px"}`,
                  "--sy": "18px",
                } as CSSProperties
              }
            >
              {u}
            </li>
          ))}
        </ul>
      ) : null}

      {step === "coordinating_agents" ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {AGENTS.map((a, i) => (
            <li
              key={a}
              className="animate-stream-in rounded-full border border-[var(--op-ink)]/30 bg-[var(--op-ink)] px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-[var(--op-warm-white)]"
              style={{ animationDelay: `${i * 140}ms` } as CSSProperties}
            >
              {a}
            </li>
          ))}
        </ul>
      ) : null}

      {step === "finding_opportunities" ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {OPPORTUNITIES.map((o, i) => (
            <li
              key={o.title}
              className="animate-stream-in rounded-xl border border-[var(--op-ink)]/20 bg-[var(--op-warm-white)]/55 p-4"
              style={{ animationDelay: `${i * 200}ms` } as CSSProperties}
            >
              <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--op-ink)]/60">
                {o.tag}
              </span>
              <p className="mt-1 text-sm font-semibold text-[var(--op-ink)]">{o.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--op-ink)]/70">{o.body}</p>
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-5 space-y-1.5">
        {meta.lines.map((line, i) => (
          <li
            key={line}
            className="animate-stream-in font-mono text-[0.65rem] tracking-[0.18em] text-[var(--op-ink)]/80"
            style={{ animationDelay: `${i * 160}ms` } as CSSProperties}
          >
            › {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiagnosticResult() {
  return (
    <div className="animate-pop-in rounded-2xl border border-[var(--op-ink)]/25 bg-[var(--op-ink)] p-6 text-[var(--op-warm-white)]">
      <p className="font-mono text-[0.62rem] tracking-[0.24em] text-[var(--op-yellow)]">
        DIAGNÓSTICO PRONTO // DEMONSTRATIVO
      </p>
      <dl className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[0.58rem] tracking-[0.2em] opacity-60">SINAL PRINCIPAL</dt>
          <dd className="mt-1 text-sm">
            Demanda ociosa em dias de semana com público recorrente subaproveitado.
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.58rem] tracking-[0.2em] opacity-60">
            PRÓXIMA JOGADA RECOMENDADA
          </dt>
          <dd className="mt-1 text-sm">
            Missão de oferta específica para o meio de semana, com criativos e mensagem testados em
            ciclo curto.
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.58rem] tracking-[0.2em] opacity-60">
            ESPECIALISTAS ENVOLVIDOS
          </dt>
          <dd className="mt-1 text-sm">Estratégia / Copy / Design / Analytics</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.58rem] tracking-[0.2em] opacity-60">CONFIANÇA</dt>
          <dd className="mt-1 text-sm">Média — requer contexto do seu negócio</dd>
        </div>
      </dl>
      <p className="mt-5 font-mono text-[0.58rem] leading-relaxed tracking-[0.14em] opacity-60">
        DEMONSTRAÇÃO DA LANDING PAGE — NENHUM DADO REAL FOI ANALISADO.
      </p>
    </div>
  );
}

export function VetorOperationOverlay({
  state,
  origin,
  activeOperationStep,
  canSkipAnimation,
  prefersReducedMotion,
  onSkip,
  onClose,
}: Props) {
  const layerRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !layerRef.current) return;
      const nodes = layerRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes.length) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const exiting = state === "exiting";
  const status = STATUS_LINES[state] ?? ["VETOR // OPERATION MODE", "SISTEMA ATIVO"];
  const showSequence = activeOperationStep !== null;
  const stepIndex = activeOperationStep ? OPERATION_STEPS.indexOf(activeOperationStep) : -1;

  return (
    <div
      ref={layerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Modo de operação do VETOR — diagnóstico demonstrativo"
      aria-describedby="vetor-op-status"
      className="fixed inset-0 z-[120] overflow-y-auto"
      style={
        {
          "--op-x": `${origin.x}%`,
          "--op-y": `${origin.y}%`,
        } as CSSProperties
      }
    >
      <div
        className={`op-field-bg absolute inset-0 ${
          prefersReducedMotion
            ? ""
            : exiting
              ? "animate-field-collapse"
              : "animate-field-expand"
        }`}
        aria-hidden="true"
      />
      <div className="op-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div id="vetor-op-status">
            <p className="font-mono text-[0.62rem] tracking-[0.26em] text-[var(--op-ink)]">
              {status[0]}
            </p>
            <p className="mt-1 font-mono text-[0.62rem] tracking-[0.26em] text-[var(--op-ink)]/60">
              {status[1]}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {canSkipAnimation ? (
              <button
                ref={firstFocusRef}
                type="button"
                onClick={onSkip}
                className="hover-pop rounded-xl border border-[var(--op-ink)]/35 px-4 py-2 text-xs font-semibold text-[var(--op-ink)]"
              >
                Ver diagnóstico agora
              </button>
            ) : null}
            <button
              ref={canSkipAnimation ? undefined : firstFocusRef}
              type="button"
              onClick={onClose}
              className="hover-pop rounded-xl bg-[var(--op-ink)] px-4 py-2 text-xs font-semibold text-[var(--op-warm-white)]"
            >
              Sair do modo de operação
            </button>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 lg:order-1">
            {showSequence ? (
              <>
                <ol className="mb-5 flex flex-wrap gap-1.5" aria-label="Etapas da operação">
                  {OPERATION_STEPS.map((s, i) => (
                    <li
                      key={s}
                      aria-current={i === stepIndex ? "step" : undefined}
                      className={`h-1.5 w-10 rounded-full ${
                        i <= stepIndex ? "bg-[var(--op-ink)]" : "bg-[var(--op-ink)]/25"
                      }`}
                    >
                      <span className="sr-only">{STEP_META[s].title}</span>
                    </li>
                  ))}
                </ol>
                <div aria-live="polite">
                  {activeOperationStep === "diagnostic_ready" ? (
                    <DiagnosticResult />
                  ) : (
                    <StepPanel step={activeOperationStep!} />
                  )}
                </div>
              </>
            ) : (
              <div aria-live="polite">
                <h2 className="text-2xl font-semibold text-[var(--op-ink)] sm:text-4xl">
                  VETOR entrando em modo de operação.
                </h2>
                <p className="mt-3 max-w-md text-sm text-[var(--op-ink)]/75">
                  O sistema recebeu o comando e está assumindo a interface para rodar um diagnóstico
                  demonstrativo.
                </p>
              </div>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <OperationCore intense={state !== "command_received"} />
          </div>
        </div>

        {activeOperationStep === "diagnostic_ready" ? (
          <footer className="animate-pop-in border-t border-[var(--op-ink)]/25 pt-6">
            <h2 className="text-2xl leading-tight font-semibold text-[var(--op-ink)] sm:text-3xl">
              O sistema está pronto.
              <span className="block">Agora é a vez do seu negócio.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--op-ink)]/75">
              O diagnóstico demonstrativo mostra como o VETOR transforma contexto em sinais, sinais
              em decisões e decisões em missões de crescimento.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="#ativar"
                onClick={onClose}
                className="hover-pop inline-flex h-12 items-center justify-center rounded-xl bg-[var(--op-ink)] px-6 text-sm font-semibold text-[var(--op-warm-white)]"
              >
                Entrar no VETOR
              </a>
              <button
                type="button"
                onClick={onClose}
                className="hover-pop inline-flex h-12 items-center justify-center rounded-xl border border-[var(--op-ink)]/35 px-6 text-sm font-semibold text-[var(--op-ink)]"
              >
                Voltar à landing page
              </button>
            </div>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
