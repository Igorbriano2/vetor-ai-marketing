import { useEffect, useState } from "react";

type Msg = { from: "cliente" | "vetor"; text: string };

const MESSAGES: Msg[] = [
  { from: "cliente", text: "Preciso de 5 posts pro feed dessa semana 🙏" },
  { from: "vetor", text: "Fechado. Vou pegar o manual da sua marca e passar pro time de design." },
  { from: "vetor", text: "Tema: promoção de quarta + 2 posts de bastidores. Confirma?" },
  { from: "cliente", text: "Confirma!" },
  { from: "vetor", text: "Perfeito. Amanhã às 14h as artes estarão no seu painel pra aprovar. 🚀" },
];

export function WhatsAppMock() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= MESSAGES.length ? 1 : c + 1));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-border bg-card p-3 shadow-soft">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          V
        </span>
        <div>
          <p className="text-sm font-semibold text-card-foreground">Vetor · Atendimento</p>
          <p className="text-xs text-primary">online agora</p>
        </div>
      </div>

      <div className="flex min-h-[320px] flex-col gap-2 py-4">
        {MESSAGES.slice(0, count).map((m, i) => (
          <div
            key={i}
            className={`animate-pop-in max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
              m.from === "cliente"
                ? "self-end rounded-br-sm bg-secondary text-secondary-foreground"
                : "self-start rounded-bl-sm bg-primary/15 text-card-foreground"
            }`}
          >
            {m.text}
          </div>
        ))}
        {count < MESSAGES.length ? (
          <div className="self-start rounded-2xl rounded-bl-sm bg-primary/15 px-3 py-2 text-sm text-muted-foreground">
            digitando…
          </div>
        ) : null}
      </div>

      <p className="border-t border-border pt-3 text-center text-xs text-muted-foreground">
        Simulação de atendimento. Tempo médio de resposta: segundos.
      </p>
    </div>
  );
}
