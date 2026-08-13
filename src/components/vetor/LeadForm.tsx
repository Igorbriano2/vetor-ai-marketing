import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Section, WHATSAPP_URL } from "./shared";
import { Reveal } from "./Reveal";

const TIPOS = [
  "Restaurante ou delivery",
  "Advocacia",
  "Arquitetura ou engenharia",
  "Saúde",
  "Estética",
  "Outro",
];

export function LeadForm() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]!);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nome.trim().length < 2 || whatsapp.replace(/\D/g, "").length < 10) {
      toast.error("Confere o nome e o WhatsApp, por favor.");
      return;
    }
    setEnviando(true);
    const { error } = await supabase
      .from("leads")
      .insert({ nome: nome.trim(), whatsapp: whatsapp.trim(), tipo_negocio: tipo });
    setEnviando(false);
    if (error) {
      toast.error("Não deu pra enviar agora. Tenta de novo ou chama no WhatsApp.");
      return;
    }
    setEnviado(true);
    toast.success("Recebido! Falamos com você em minutos.");
    setNome("");
    setWhatsapp("");
  }

  return (
    <Section id="contato">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl leading-tight sm:text-4xl">
            Sua agência atual está dormindo agora.{" "}
            <span className="text-primary">A sua nova, não.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Deixe seu contato e a gente te mostra, em poucos minutos e pelo WhatsApp, como ficaria
            uma semana de marketing do seu negócio com o Vetor. Sem fidelidade, sem apresentação de
            uma hora, sem enrolação.
          </p>
          <ul className="mt-6 space-y-2 text-sm font-medium">
            <li>✓ Resposta em segundos, 24h por dia</li>
            <li>✓ Escopo escrito, preço fechado</li>
            <li>✓ Cancele quando quiser</li>
          </ul>
        </Reveal>

        <Reveal delay={120} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          {enviado ? (
            <div className="animate-pop-in text-center">
              <p className="text-2xl font-bold text-card-foreground">Deu certo! 🎉</p>
              <p className="mt-2 text-muted-foreground">
                Já estamos com o seu contato. Se quiser adiantar, chama a gente agora mesmo.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground"
              >
                Falar no WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nome" className="text-sm font-semibold text-card-foreground">
                  Seu nome
                </label>
                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Como podemos te chamar?"
                  className="mt-1 h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="whats" className="text-sm font-semibold text-card-foreground">
                  Seu WhatsApp
                </label>
                <input
                  id="whats"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  inputMode="tel"
                  placeholder="(11) 90000-0000"
                  className="mt-1 h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="tipo" className="text-sm font-semibold text-card-foreground">
                  Tipo de negócio
                </label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none focus:border-primary"
                >
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={enviando}
                className="hover-pop h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60"
              >
                {enviando ? "Enviando…" : "Quero falar com o Vetor"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Usamos seus dados só pra entrar em contato. Nada de spam, conforme a LGPD.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
