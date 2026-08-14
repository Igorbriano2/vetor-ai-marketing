export type VetorActivationState =
  | "idle"
  | "command_received"
  | "core_expanding"
  | "operation_mode"
  | "loading_context"
  | "analyzing_signals"
  | "coordinating_agents"
  | "finding_opportunities"
  | "diagnostic_ready"
  | "exiting";

export type OperationStep = Extract<
  VetorActivationState,
  | "loading_context"
  | "analyzing_signals"
  | "coordinating_agents"
  | "finding_opportunities"
  | "diagnostic_ready"
>;

export const OPERATION_STEPS: OperationStep[] = [
  "loading_context",
  "analyzing_signals",
  "coordinating_agents",
  "finding_opportunities",
  "diagnostic_ready",
];

export const STEP_META: Record<
  OperationStep,
  { code: string; title: string; lines: string[] }
> = {
  loading_context: {
    code: "01 // CONTEXT",
    title: "Contexto recebido",
    lines: [
      "CONTEXTO RECEBIDO",
      "PERFIL DO NEGÓCIO CARREGADO",
      "SINAIS DO PÚBLICO IDENTIFICADOS",
    ],
  },
  analyzing_signals: {
    code: "02 // ANALYSIS",
    title: "Analisando o negócio",
    lines: [
      "ANALISANDO SINAIS DE MERCADO",
      "MAPEANDO A JORNADA DO CLIENTE",
      "IDENTIFICANDO GARGALOS DE CRESCIMENTO",
    ],
  },
  coordinating_agents: {
    code: "03 // SPECIALISTS",
    title: "Coordenando especialistas",
    lines: [
      "ESTRATÉGIA // MISSÃO PRONTA",
      "COPY // CONSTRUINDO ÂNGULOS",
      "DESIGN // GERANDO VARIAÇÕES",
      "ANALYTICS // DEFININDO SINAIS",
    ],
  },
  finding_opportunities: {
    code: "04 // OPPORTUNITIES",
    title: "Oportunidades identificadas",
    lines: [
      "DEMANDA OCIOSA EM DIAS DE SEMANA",
      "SEGMENTO DE MAIOR VALOR",
      "ÂNGULO DE CONTEÚDO COM POTENCIAL",
    ],
  },
  diagnostic_ready: {
    code: "05 // DIAGNOSTIC",
    title: "Diagnóstico demonstrativo pronto",
    lines: ["DIAGNÓSTICO PRONTO"],
  },
};

export const STEP_DURATION: Record<OperationStep, number> = {
  loading_context: 2200,
  analyzing_signals: 2300,
  coordinating_agents: 2800,
  finding_opportunities: 2400,
  diagnostic_ready: 0,
};

export const AGENTS = [
  "ESTRATÉGIA",
  "GROWTH",
  "COPY",
  "DESIGN",
  "TRÁFEGO",
  "SOCIAL",
  "ANALYTICS",
] as const;

export const CONTEXT_UNITS = [
  "PERFIL DO NEGÓCIO",
  "CANAIS ATIVOS",
  "OFERTA PRINCIPAL",
  "PÚBLICO RECORRENTE",
  "SAZONALIDADE",
  "CONCORRÊNCIA LOCAL",
];

export const OPPORTUNITIES = [
  {
    tag: "HIPÓTESE",
    title: "Demanda ociosa em dias de semana",
    body: "Sinais indicam janelas de baixa procura que podem responder a uma oferta específica. Precisa de teste.",
  },
  {
    tag: "HIPÓTESE",
    title: "Segmento de maior valor",
    body: "Parte do público tende a comprar mais vezes. Vale isolar esse grupo antes de escalar investimento.",
  },
  {
    tag: "HIPÓTESE",
    title: "Ângulo de conteúdo com potencial",
    body: "Um tema recorrente aparece nas conversas e ainda não é explorado nas peças atuais.",
  },
];
