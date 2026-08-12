import { Section, SectionTitle } from "./shared";

const CARDS = [
  {
    titulo: "Estratégia e Inteligência",
    texto:
      "Planejam o funil do começo ao fim, olham o que a concorrência da sua rua está anunciando e ajustam o plano com base nos números da semana — não no achismo.",
  },
  {
    titulo: "Criação",
    texto:
      "Design, vídeo e social media produzindo peças dentro do manual da sua marca: suas cores, sua fonte, seu jeito de falar. Nada de template genérico com foto de banco de imagem.",
  },
  {
    titulo: "Aquisição de Clientes",
    texto:
      "Campanhas de tráfego pago acompanhadas todos os dias, com trava automática de custo. Passou do teto que você definiu, o anúncio para na hora.",
  },
  {
    titulo: "Atendimento",
    texto:
      "Um time no WhatsApp recebendo pedido, dúvida e áudio às 7h da manhã ou às 23h, organizando tudo e devolvendo prazo. Supervisão humana no que precisa de gente.",
  },
];

export function Bastidores() {
  return (
    <Section id="bastidores">
      <SectionTitle
        eyebrow="Quem executa"
        title="O que está por trás"
        subtitle="Quatro frentes de trabalho rodando ao mesmo tempo, treinadas nos mesmos livros e métodos usados pelos melhores estrategistas do mercado."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c, i) => (
          <div
            key={c.titulo}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
          >
            <span className="text-sm font-bold text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl text-card-foreground">{c.titulo}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{c.texto}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
