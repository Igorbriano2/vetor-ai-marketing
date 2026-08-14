import { Reveal } from "./Reveal";
import { MonoLabel, SectionHeading, SectionShell } from "./system";

const PLANOS = [
  {
    nome: "DESIGN",
    preco: "R$ 297",
    sufixo: "/mês",
    cota: "8 peças de design por mês (feed + story)",
    excedente: "Excedente: R$ 30 por peça extra",
    itens: ["Manual de marca aplicado automaticamente", "Aprovação pelo painel"],
  },
  {
    nome: "SOCIAL MEDIA",
    preco: "R$ 327",
    sufixo: "/mês",
    cota: "Calendário editorial + 12 publicações por mês",
    excedente: "Excedente: R$ 22 por publicação extra",
    itens: ["Legendas no tom da marca", "Agendamento automático"],
  },
  {
    nome: "DUPLA DE AGENTES",
    preco: "R$ 547",
    sufixo: "/mês",
    cota: "8 peças de design + 12 publicações",
    excedente: "Mais barato que Design + Social separados",
    itens: ["Atendimento 24h via WhatsApp", "Painel único de missões"],
    destaque: true,
  },
  {
    nome: "TRÁFEGO",
    preco: "R$ 297",
    sufixo: "/mês + 8% da verba",
    cota: "Até 3 campanhas ativas simultâneas",
    excedente: "Excedente: R$ 40 por campanha extra ativa",
    itens: ["Pausa automática por teto de custo", "Relatório semanal"],
  },
  {
    nome: "COMPLETO",
    preco: "R$ 897",
    sufixo: "/mês + 8% da verba",
    cota: "15 peças + 20 publicações + até 5 campanhas",
    excedente: "Revisão de estratégia trimestral",
    itens: ["Relatórios semanais do agente Analytics", "Atendimento 24h via WhatsApp incluso"],
  },
];

export function AutonomyPlans() {
  return (
    <SectionShell id="planos" className="border-t border-border/60">
      <SectionHeading
        index="07"
        eyebrow="níveis de autonomia"
        title="Escolha até onde o VETOR opera sozinho."
        subtitle="Sem ilimitado vago: cada plano tem cota + excedente claro, sem precisar trocar de plano."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLANOS.map((p, i) => (
          <Reveal key={p.nome} delay={i * 70}>
            <div
              className={`hover-lift flex h-full flex-col rounded-2xl border p-6 ${
                p.destaque
                  ? "animate-highlight-pulse border-primary/60 bg-primary/[0.07]"
                  : "panel border-border"
              }`}
            >
              {p.destaque ? <MonoLabel tone="cyan">mais escolhido</MonoLabel> : null}
              <h3 className="mt-1 font-mono text-[0.7rem] tracking-[0.2em] text-primary">{p.nome}</h3>
              <p className="mt-3 text-3xl font-semibold">
                {p.preco}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{p.sufixo}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{p.cota}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.excedente}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {p.itens.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-primary" aria-hidden="true">
                      ▸
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#ativar"
                className={`hover-pop mt-6 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  p.destaque
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "border border-border text-foreground"
                }`}
              >
                ATIVAR
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
