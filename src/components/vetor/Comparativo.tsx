import { Section, SectionTitle } from "./shared";

const LINHAS = [
  {
    criterio: "Tempo de resposta",
    tradicional: "3 dias úteis pra responder um e-mail",
    vetor: "Poucos segundos, no WhatsApp, a qualquer hora",
  },
  {
    criterio: "Disponibilidade",
    tradicional: "Segunda a sexta, das 9h às 18h",
    vetor: "Todos os dias, inclusive feriado e domingo à noite",
  },
  {
    criterio: "Custo mensal",
    tradicional: "Uma fatia pesada do seu faturamento",
    vetor: "Preço fechado que cabe em um negócio pequeno",
  },
  {
    criterio: "Transparência",
    tradicional: "PDF mensal que chega dia 15 do mês seguinte",
    vetor: "Painel ao vivo, você olha quando quiser",
  },
  {
    criterio: "Fidelidade",
    tradicional: "Contrato de 6 a 12 meses com multa",
    vetor: "Sem fidelidade. Cancelou, acabou",
  },
];

export function Comparativo() {
  return (
    <Section id="comparativo" dark>
      <SectionTitle
        eyebrow="Comparação"
        title="Agência tradicional x Vetor"
        subtitle="Nada contra agência de gente. A conta é que costuma não fechar pra quem tem um negócio pequeno."
      />

      <div className="overflow-hidden rounded-3xl border border-border">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="bg-card">
              <th className="p-4 font-semibold text-muted-foreground">&nbsp;</th>
              <th className="p-4 font-semibold text-muted-foreground">Agência tradicional</th>
              <th className="p-4 font-semibold text-primary">Vetor</th>
            </tr>
          </thead>
          <tbody>
            {LINHAS.map((l) => (
              <tr key={l.criterio} className="border-t border-border align-top">
                <th scope="row" className="p-4 text-left font-semibold">
                  {l.criterio}
                </th>
                <td className="p-4 text-muted-foreground">{l.tradicional}</td>
                <td className="bg-primary/10 p-4 font-medium">{l.vetor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
