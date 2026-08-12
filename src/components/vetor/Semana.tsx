import { Section, SectionTitle } from "./shared";

const ETAPAS = [
  {
    quando: "Segunda, 09h00",
    titulo: "Você manda a demanda no WhatsApp",
    texto:
      "\u201cPreciso de 5 posts pro feed dessa semana.\u201d É só isso. Sem briefing de dez páginas, sem reunião de alinhamento.",
  },
  {
    quando: "Segunda, 09h02",
    titulo: "O Agente Secretário organiza e distribui",
    texto:
      "Ele transforma o seu áudio ou recado em tarefas claras, define os temas com base no que já funcionou e manda pro Design e pro Social Media.",
  },
  {
    quando: "Terça, 14h00",
    titulo: "As peças aparecem no seu painel",
    texto:
      "Artes prontas, dentro do seu manual de marca, com legenda escrita no seu tom. Você aprova, pede ajuste ou reprova em dois toques.",
  },
  {
    quando: "Quarta",
    titulo: "O Agente de Tráfego corrige a campanha sozinho",
    texto:
      "O custo por lead subiu às 23h. O anúncio caro é pausado, a verba vai pro conjunto que está performando e o registro fica no painel. Você descobre no dia seguinte, com o problema já resolvido.",
  },
  {
    quando: "Sexta",
    titulo: "O relatório chega sem você pedir",
    texto:
      "Quanto foi investido, quantos contatos chegaram, quanto custou cada um e o que muda na semana que vem. Em português, não em siglas.",
  },
];

export function Semana() {
  return (
    <Section id="semana" dark>
      <SectionTitle
        eyebrow="Rotina"
        title="Uma semana de trabalho da sua agência"
        subtitle="Sem cobrança de retorno, sem “te respondo amanhã”. Assim é uma semana comum com o Vetor."
      />

      <ol className="relative ml-3 border-l border-border pl-6 sm:pl-10">
        {ETAPAS.map((e) => (
          <li key={e.quando} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[31px] mt-1 grid size-4 place-items-center rounded-full bg-primary sm:-left-[47px]">
              <span className="size-1.5 rounded-full bg-primary-foreground" />
            </span>
            <p className="text-sm font-semibold text-primary">{e.quando}</p>
            <h3 className="mt-1 text-xl">{e.titulo}</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {e.texto}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
