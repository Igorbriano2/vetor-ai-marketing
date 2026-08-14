import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { BootSequence } from "@/components/vetor/BootSequence";
import { SystemNav } from "@/components/vetor/SystemNav";
import { Hero } from "@/components/vetor/Hero";
import { Fragmentacao } from "@/components/vetor/Fragmentacao";
import { AgentNetwork } from "@/components/vetor/AgentNetwork";
import { MissionTimeline } from "@/components/vetor/MissionTimeline";
import { CicloInteligencia } from "@/components/vetor/CicloInteligencia";
import { VerticalSelector } from "@/components/vetor/VerticalSelector";
import { SignalCards } from "@/components/vetor/SignalCards";
import { AutonomyPlans } from "@/components/vetor/AutonomyPlans";
import { FinalActivation } from "@/components/vetor/FinalActivation";
import { Footer } from "@/components/vetor/Footer";
import { FloatingWhats } from "@/components/vetor/FloatingWhats";
import { VetorActivationController } from "@/components/vetor/activation/VetorActivationController";

const TITLE = "VETOR — o sistema operacional de crescimento do seu negócio";
const DESCRIPTION =
  "Uma agência autônoma operada por inteligência artificial: missões de crescimento, execução contínua e decisões suas. Atendimento 24h pelo WhatsApp.";

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
    <VetorActivationController>
      <main className="scroll-smooth bg-background">
        <BootSequence />
        <SystemNav />
        <Hero />
        <Fragmentacao />
        <AgentNetwork />
        <MissionTimeline />
        <CicloInteligencia />
        <VerticalSelector />
        <SignalCards />
        <AutonomyPlans />
        <FinalActivation />
        <Footer />
        <FloatingWhats />
        <Toaster position="top-center" />
      </main>
    </VetorActivationController>
  );
}
