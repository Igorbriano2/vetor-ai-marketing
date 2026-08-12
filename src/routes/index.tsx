import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/vetor/Hero";
import { Nichos } from "@/components/vetor/Nichos";
import { Semana } from "@/components/vetor/Semana";
import { Bastidores } from "@/components/vetor/Bastidores";
import { Comparativo } from "@/components/vetor/Comparativo";
import { Planos } from "@/components/vetor/Planos";
import { Faq } from "@/components/vetor/Faq";
import { LeadForm } from "@/components/vetor/LeadForm";
import { Footer } from "@/components/vetor/Footer";
import { FloatingWhats } from "@/components/vetor/FloatingWhats";

const TITLE = "Vetor — a agência de marketing que nunca dorme";
const DESCRIPTION =
  "Time de agentes de IA em tráfego, design, social media e estratégia atendendo seu negócio pelo WhatsApp 24h. Sem fidelidade, preço fechado.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <Nichos />
      <Semana />
      <Bastidores />
      <Comparativo />
      <Planos />
      <Faq />
      <LeadForm />
      <Footer />
      <FloatingWhats />
      <Toaster position="top-center" />
    </main>
  );
}
