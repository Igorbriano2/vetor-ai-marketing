import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  OPERATION_STEPS,
  STEP_DURATION,
  type OperationStep,
  type VetorActivationState,
} from "./types";
import { VetorOperationOverlay } from "./VetorOperationOverlay";

type Origin = { x: number; y: number };

type ActivationApi = {
  state: VetorActivationState;
  isActivationOpen: boolean;
  activate: (origin?: Origin) => void;
};

const Ctx = createContext<ActivationApi | null>(null);

export function useVetorActivation() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVetorActivation precisa do VetorActivationController");
  return ctx;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function VetorActivationController({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VetorActivationState>("idle");
  const [origin, setOrigin] = useState<Origin>({ x: 50, y: 45 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastFocused = useRef<HTMLElement | null>(null);

  const clearTimers = useCallback(() => {
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const isActivationOpen = state !== "idle";
  const activeOperationStep: OperationStep | null = OPERATION_STEPS.includes(
    state as OperationStep,
  )
    ? (state as OperationStep)
    : null;

  const runSteps = useCallback(
    (from = 0) => {
      clearTimers();
      let acc = 0;
      for (let i = from; i < OPERATION_STEPS.length; i++) {
        const step = OPERATION_STEPS[i]!;
        after(acc, () => setState(step));
        acc += prefersReducedMotion ? Math.min(STEP_DURATION[step], 900) : STEP_DURATION[step];
        if (STEP_DURATION[step] === 0) break;
      }
    },
    [after, clearTimers, prefersReducedMotion],
  );

  const activate = useCallback(
    (o?: Origin) => {
      if (isActivationOpen) return;
      lastFocused.current = (document.activeElement as HTMLElement) ?? null;
      if (o) setOrigin(o);
      clearTimers();
      if (prefersReducedMotion) {
        setState("operation_mode");
        after(250, () => runSteps(0));
        return;
      }
      setState("command_received");
      after(420, () => setState("core_expanding"));
      after(1300, () => setState("operation_mode"));
      after(1950, () => runSteps(0));
    },
    [after, clearTimers, isActivationOpen, prefersReducedMotion, runSteps],
  );

  const close = useCallback(() => {
    clearTimers();
    setState("exiting");
    after(prefersReducedMotion ? 120 : 480, () => {
      setState("idle");
      lastFocused.current?.focus?.();
    });
  }, [after, clearTimers, prefersReducedMotion]);

  const skip = useCallback(() => {
    clearTimers();
    setState("diagnostic_ready");
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  // Bloqueio de scroll apenas enquanto a camada está aberta
  useEffect(() => {
    if (!isActivationOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isActivationOpen]);

  const value = useMemo(
    () => ({ state, isActivationOpen, activate }),
    [state, isActivationOpen, activate],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {isActivationOpen ? (
        <VetorOperationOverlay
          state={state}
          origin={origin}
          activeOperationStep={activeOperationStep}
          canSkipAnimation={state !== "diagnostic_ready" && state !== "exiting"}
          prefersReducedMotion={prefersReducedMotion}
          onSkip={skip}
          onClose={close}
        />
      ) : null}
    </Ctx.Provider>
  );
}
