import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MonoLabel, SectionHeading, SectionShell, WHATSAPP_URL } from "./system";

export function FinalActivation() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipoNegocio, setTipoNegocio] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim() || !tipoNegocio.trim()) {
      toast.error("Preencha nome, WhatsApp e tipo de negócio.");
      return;
    }
    setEnviando(true);
    const { error } = await supabase
      .from("leads")
      .insert({ nome: nome.trim(), whatsapp: whatsapp.trim(), tipo_negocio: tipoNegocio.trim() });
    setEnviando(false);
    if (error) {
      toast.error("Não conseguimos enviar agora. Tente pelo WhatsApp.");
      return;
    }
    toast.success("Recebido. O VETOR entra em contato em instantes.");
    setNome("");
    setWhatsapp("");
    setTipoNegocio("");
  }

  return (
    <SectionShell id="ativar" className="border-t border-border/60">
      <SectionHeading
        index="08"
        eyebrow="ativação"
        title="Ative o VETOR para o seu negócio."
        subtitle="Você descreve o objetivo. O sistema monta a primeira missão e mostra o plano antes de executar."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="panel rounded-2xl p-6">
          <MonoLabel tone="cyan">system status</MonoLabel>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>Sem fidelidade — cancele quando quiser.</li>
            <li>Setup em minutos, direto no WhatsApp.</li>
            <li>Você aprova o que sai; o VETOR executa o resto.</li>
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hover-pop mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold"
          >
            Falar no WhatsApp
          </a>
        </div>

        <form onSubmit={onSubmit} className="panel rounded-2xl p-6">
          <div className="grid gap-4">
            <label className="block">
              <span className="mono-label">nome</span>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-border bg-void/60 px-4 text-base outline-none focus-visible:border-primary"
                placeholder="Como podemos te chamar"
              />
            </label>
            <label className="block">
              <span className="mono-label">whatsapp</span>
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                inputMode="tel"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-void/60 px-4 text-base outline-none focus-visible:border-primary"
                placeholder="(11) 90000-0000"
              />
            </label>
            <label className="block">
              <span className="mono-label">tipo de negócio</span>
              <input
                value={tipoNegocio}
                onChange={(e) => setTipoNegocio(e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-border bg-void/60 px-4 text-base outline-none focus-visible:border-primary"
                placeholder="Restaurante, clínica, escritório..."
              />
            </label>
            <button
              type="submit"
              disabled={enviando}
              className="hover-pop mt-1 inline-flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {enviando ? "ENVIANDO..." : "ATIVAR O VETOR"}
            </button>
          </div>
        </form>
      </div>
    </SectionShell>
  );
}
