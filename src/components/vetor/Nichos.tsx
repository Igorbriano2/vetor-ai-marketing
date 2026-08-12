import { useState } from "react";
import { Section, SectionTitle } from "./shared";

const NICHOS = [
  {
    id: "restaurantes",
    nome: "Restaurantes e Delivery",
    caso: "\u201cQuero encher a casa nas terças.\u201d",
    texto:
      "O time monta uma promoção só de terça, cria as artes com foto do prato, sobe anúncio pro raio de 4 km do restaurante e mede quantos pedidos vieram do anúncio. Se o custo por pedido passar do teto, a campanha pausa sozinha.",
  },
  {
    id: "advogados",
    nome: "Advogados",
    caso: "\u201cPreciso de mais consultas de direito trabalhista.\u201d",
    texto:
      "Conteúdo educativo no feed, sem promessa de resultado e dentro do que o Código de Ética permite. Quem chama no WhatsApp é triado na hora: tipo de caso, cidade e urgência já chegam organizados pro escritório.",
  },
  {
    id: "arquitetos",
    nome: "Arquitetos e Engenheiros",
    caso: "\u201cMeu portfólio é lindo e ninguém vê.\u201d",
    texto:
      "Cada projeto vira um carrossel de antes e depois com a sua identidade visual. O anúncio busca quem está reformando na sua região, e o formulário já pergunta metragem e prazo antes de virar reunião.",
  },
  {
    id: "saude",
    nome: "Profissionais da Saúde",
    caso: "\u201cMinha agenda tem buraco na quinta de manhã.\u201d",
    texto:
      "Campanha específica pros horários vazios, linguagem dentro das regras do conselho, sem antes e depois proibido. O atendimento responde dúvida de convênio e valor às 22h, quando o paciente realmente procura.",
  },
  {
    id: "estetica",
    nome: "Estética",
    caso: "\u201cQuero lotar a agenda de um procedimento novo.\u201d",
    texto:
      "Sequência de posts explicando o procedimento, anúncio com oferta de primeira sessão e lembrete automático pra quem pediu informação e sumiu. Você recebe a lista de quem está pronto pra agendar.",
  },
];

export function Nichos() {
  const [ativo, setAtivo] = useState(NICHOS[0]!.id);
  const atual = NICHOS.find((n) => n.id === ativo)!;

  return (
    <Section id="nichos">
      <SectionTitle
        eyebrow="Do seu jeito"
        title="Veja com os olhos do seu negócio"
        subtitle="Marketing genérico não vende. Escolha o seu tipo de negócio e veja como o Vetor trabalha na prática."
      />

      <div className="flex flex-wrap gap-2">
        {NICHOS.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setAtivo(n.id)}
            aria-pressed={ativo === n.id}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              ativo === n.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-card-foreground hover:border-primary/50"
            }`}
          >
            {n.nome}
          </button>
        ))}
      </div>

      <div
        key={atual.id}
        className="animate-pop-in mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <p className="text-xl font-semibold text-card-foreground sm:text-2xl">{atual.caso}</p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {atual.texto}
        </p>
      </div>
    </Section>
  );
}
