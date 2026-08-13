import { Section, SectionTitle, WHATSAPP_URL } from "./shared";
import { Reveal } from "./Reveal";

const PLANOS = [
  {
    nome: "Design",
    preco: "R$ 297",
    periodo: "/mês",
    cota: "Inclui 8 peças por mês (feed + story)",
    excedente: "Peça extra: R$ 30",
    resumo: "Pra quem já sabe o que postar, mas não tem quem faça a arte.",
    itens: [
      "8 peças de design por mês, feed e story",
      "Manual de marca aplicado automaticamente",
      "Aprovação e histórico pelo painel",
      "Pedidos pelo WhatsApp, sem formulário chato",
    ],
  },
  {
    nome: "Social Media",
    preco: "R$ 327",
    periodo: "/mês",
    cota: "Inclui calendário editorial + 12 publicações por mês",
    excedente: "Publicação extra: R$ 22",
    resumo: "Pra quem trava na hora de decidir o que publicar.",
    itens: [
      "Calendário editorial do mês inteiro",
      "12 publicações por mês",
      "Legendas escritas no tom da sua marca",
      "Agendamento automático das publicações",
    ],
  },
  {
    nome: "Dupla de Agentes",
    preco: "R$ 547",
    periodo: "/mês",
    destaque: true,
    cota: "Inclui 8 peças de design + 12 publicações por mês",
    excedente: "Peça extra R$ 30 · Publicação extra R$ 22",
    resumo: "Arte e conteúdo no mesmo lugar — R$ 77 mais barato que contratar Design + Social Media separados.",
    itens: [
      "Tudo do Design + tudo do Social Media",
      "Atendimento 24h via WhatsApp",
      "Painel único de aprovação e histórico",
      "Relatório mensal de desempenho do conteúdo",
    ],
  },
  {
    nome: "Tráfego",
    preco: "R$ 297",
    periodo: "/mês + 8% da verba de mídia",
    cota: "Inclui gestão de até 3 campanhas ativas ao mesmo tempo",
    excedente: "Campanha ativa extra: R$ 40",
    resumo: "Pra quem quer telefone tocando, não só curtida.",
    itens: [
      "Criação e gestão de campanhas no Meta Ads",
      "Pausa automática ao bater o teto de custo",
      "Acompanhamento diário das campanhas",
      "Relatório semanal com o que muda na semana seguinte",
    ],
  },
  {
    nome: "Completo",
    preco: "R$ 897",
    periodo: "/mês + 8% da verba de mídia",
    cota: "Inclui 15 peças + 20 publicações + até 5 campanhas ativas",
    excedente: "Peça extra R$ 30 · Publicação extra R$ 22 · Campanha extra R$ 40",
    resumo: "Todos os agentes trabalhando juntos, do conteúdo ao anúncio.",
    itens: [
      "15 peças de design e 20 publicações por mês",
      "Gestão de até 5 campanhas de tráfego",
      "Revisão de estratégia a cada trimestre",
      "Relatórios semanais do Agente Analítico",
      "Atendimento 24h via WhatsApp incluso",
    ],
  },
];

export function Planos() {
  return (
    <Section id="planos">
      <SectionTitle
        eyebrow="Planos"
        title="Escolha por onde começar"
        subtitle="Sem “ilimitado” vago: cada plano tem cota + excedente claro, sem precisar trocar de plano. Você pode mudar ou sair quando quiser."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PLANOS.map((p, i) => (
          <Reveal key={p.nome} delay={i * 80}>
            <div
              className={`hover-lift flex h-full flex-col rounded-3xl border p-6 shadow-soft ${
                p.destaque
                  ? "animate-highlight-pulse border-primary bg-card ring-2 ring-primary/40"
                  : "border-border bg-card hover:border-primary/40"
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
              <div className="mt-3 rounded-xl border border-border bg-secondary/60 px-3 py-2">
                <p className="text-xs font-semibold text-card-foreground">{p.cota}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.excedente}</p>
              </div>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-card-foreground">
                {p.itens.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-primary" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="hover-pop mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Quero esse plano
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-center text-sm font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-card-foreground"
              >
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Excedente só é cobrado se você usar. Nada de plano trocado no meio do mês.
      </p>
    </Section>
  );
}
