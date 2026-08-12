import { Section, SectionTitle, WHATSAPP_URL } from "./shared";

const PLANOS = [
  {
    nome: "Design",
    preco: "R$ 497",
    periodo: "/mês",
    resumo: "Pra quem já sabe o que postar, mas não tem quem faça a arte.",
    itens: [
      "Até 12 peças de design por mês",
      "Manual de marca aplicado automaticamente",
      "Aprovação e histórico pelo painel",
      "Pedidos pelo WhatsApp, sem formulário chato",
    ],
  },
  {
    nome: "Social Media",
    preco: "R$ 597",
    periodo: "/mês",
    resumo: "Pra quem trava na hora de decidir o que publicar.",
    itens: [
      "Calendário editorial do mês inteiro",
      "Legendas escritas no tom da sua marca",
      "Agendamento automático das publicações",
      "Ajuste de tema quando algo estoura na sua região",
    ],
  },
  {
    nome: "Dupla de Agentes",
    preco: "R$ 897",
    periodo: "/mês",
    destaque: true,
    resumo: "Arte e conteúdo resolvidos no mesmo lugar. O plano que a maioria escolhe.",
    itens: [
      "Tudo do Design + tudo do Social Media",
      "Atendimento 24h via WhatsApp",
      "Painel único de aprovação e histórico",
      "Relatório mensal de desempenho do conteúdo",
    ],
  },
  {
    nome: "Tráfego",
    preco: "R$ 797",
    periodo: "/mês + taxa sobre a verba",
    resumo: "Pra quem quer telefone tocando, não só curtida.",
    itens: [
      "Criação e gestão de campanhas no Meta Ads",
      "Pausa automática ao bater o teto de custo",
      "Acompanhamento diário das campanhas",
      "Relatório semanal com o que muda na semana seguinte",
    ],
  },
];

export function Planos() {
  return (
    <Section id="planos">
      <SectionTitle
        eyebrow="Planos"
        title="Escolha por onde começar"
        subtitle="Preço fechado, escopo escrito, sem “ilimitado” que ninguém explica. Você pode trocar de plano ou sair quando quiser."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PLANOS.map((p) => (
          <div
            key={p.nome}
            className={`flex flex-col rounded-3xl border p-6 shadow-soft ${
              p.destaque
                ? "border-primary bg-card ring-2 ring-primary/40"
                : "border-border bg-card"
            }`}
          >
            {p.destaque ? (
              <span className="mb-3 self-start rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase">
                Mais popular
              </span>
            ) : null}
            <h3 className="text-xl text-card-foreground">{p.nome}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.resumo}</p>
            <p className="mt-4">
              <span className="text-3xl font-bold text-card-foreground">{p.preco}</span>
              <span className="text-sm text-muted-foreground"> {p.periodo}</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-card-foreground">
              {p.itens.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 text-primary" aria-hidden="true">
                    ✓
                  </span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Quero esse plano
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-center text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-card-foreground"
            >
              Falar no WhatsApp
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
