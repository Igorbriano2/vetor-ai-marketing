import { useState } from "react";
import { MonoLabel, SectionHeading, SectionShell } from "./system";

const VERTICAIS = [
  {
    id: "restaurantes",
    nome: "RESTAURANTES",
    objetivo: "Aumentar pedidos de delivery",
    sinal: "Queda de demanda em dias de semana",
    missao: "Campanha de conversão para terça a quinta",
    agentes: "Growth / Strategy / Copy / Design / Traffic / Analytics",
  },
  {
    id: "advocacia",
    nome: "ADVOCACIA",
    objetivo: "Mais consultas qualificadas",
    sinal: "Volume alto de contatos fora da área de atuação",
    missao: "Conteúdo de autoridade + triagem no primeiro contato",
    agentes: "Strategy / Copy / Social / Analytics",
  },
  {
    id: "saude",
    nome: "SAÚDE",
    objetivo: "Preencher horários ociosos",
    sinal: "Buracos recorrentes na agenda da manhã",
    missao: "Ativação local para janelas específicas",
    agentes: "Growth / Copy / Traffic / CRM / Analytics",
  },
  {
    id: "estetica",
    nome: "ESTÉTICA",
    objetivo: "Ocupar a agenda disponível",
    sinal: "Capacidade não utilizada nos próximos 14 dias",
    missao: "Fluxo de ativação de demanda local",
    agentes: "Growth / Copy / Social / CRM / Analytics",
  },
  {
    id: "arquitetura",
    nome: "ARQUITETURA",
    objetivo: "Orçamentos com fit de projeto",
    sinal: "Portfólio com baixo alcance na região",
    missao: "Vitrine de projetos + qualificação por metragem e prazo",
    agentes: "Strategy / Design / Video / Traffic",
  },
  {
    id: "servicos",
    nome: "SERVIÇOS LOCAIS",
    objetivo: "Reduzir tempo de resposta ao lead",
    sinal: "Contatos perdidos fora do horário comercial",
    missao: "Atendimento contínuo com roteamento por urgência",
    agentes: "Growth / Copy / Social / Analytics",
  },
];

export function VerticalSelector() {
  const [ativo, setAtivo] = useState(VERTICAIS[0]!.id);
  const atual = VERTICAIS.find((v) => v.id === ativo)!;

  return (
    <SectionShell id="verticais" className="border-t border-border/60">
      <SectionHeading
        index="05"
        eyebrow="demonstração por vertical"
        title="Escolha o seu tipo de negócio e veja a missão que o VETOR montaria."
      />

      <div role="tablist" aria-label="Tipo de negócio" className="flex flex-wrap gap-2">
        {VERTICAIS.map((v) => {
          const on = v.id === ativo;
          return (
            <button
              key={v.id}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setAtivo(v.id)}
              className={`hover-pop rounded-full border px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                on
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.nome}
            </button>
          );
        })}
      </div>

      <div key={atual.id} className="panel animate-pop-in mt-6 rounded-2xl p-5 sm:p-7">
        <MonoLabel tone="cyan">mission preview // {atual.id}</MonoLabel>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          {[
            ["OBJETIVO", atual.objetivo],
            ["SINAL DETECTADO", atual.sinal],
            ["MISSÃO", atual.missao],
            ["AGENTES ACIONADOS", atual.agentes],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="mono-label">{k}</dt>
              <dd className="mt-1.5 text-base leading-relaxed text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}
