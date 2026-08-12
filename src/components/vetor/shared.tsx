import type { ReactNode } from "react";

export const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=" +
  encodeURIComponent("Oi! Vim pelo site do Vetor e quero saber como funciona.");

export function Section({
  id,
  dark,
  children,
  className = "",
}: {
  id?: string;
  dark?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${dark ? "section-dark" : "bg-background"} px-5 py-16 sm:px-8 md:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow ? (
        <span className="mb-3 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function VetorLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`}>
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M4 5l7 12 4-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 5.5H19v5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg">Vetor</span>
    </span>
  );
}
