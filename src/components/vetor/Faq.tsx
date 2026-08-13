import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionTitle } from "./shared";
import { Reveal } from "./Reveal";

const PERGUNTAS = [
  {
    q: "Como funciona a inteligência artificial? Ela erra?",
    a: "Erra, sim — como qualquer time. A diferença é o método: cada peça e cada campanha passa por checagem automática de marca, de escopo e de custo, e um supervisor humano revisa o que sai fora do padrão. O que a IA garante é consistência e velocidade: ela não esquece o seu calendário, não some em feriado e não deixa um anúncio caro rodando a noite inteira.",
  },
  {
    q: "Preciso trocar de número de WhatsApp?",
    a: "Não. Você continua com o seu número de sempre. O Vetor atende você em um número próprio, dedicado à operação do seu marketing. Se quiser que a gente também organize o atendimento dos seus clientes, isso é conversado à parte e sem trocar sua linha.",
  },
  {
    q: "Quanto tempo leva pra configurar?",
    a: "A conversa inicial leva alguns minutos: nome do negócio, o que você vende, cores e logo (se tiver) e a sua meta. Em até 48h o primeiro calendário e as primeiras peças estão prontos pra aprovação. Campanhas de tráfego dependem de acesso ao gerenciador de anúncios, o que costuma levar mais um dia.",
  },
  {
    q: "Funciona pro meu tipo de negócio?",
    a: "O Vetor foi montado pra negócio pequeno de serviço e de bairro: restaurante e delivery, advogado, arquiteto e engenheiro, profissional da saúde e estética. Se o seu caso for diferente, chama no WhatsApp e a gente diz com franqueza se faz sentido ou não. Não vendemos plano pra quem não vamos conseguir ajudar.",
  },
  {
    q: "E se eu quiser falar com uma pessoa de verdade?",
    a: "É só pedir. Tem gente supervisionando a operação todo dia e você pode chamar um humano a qualquer momento — para reclamar, para pedir uma mudança de rumo ou só para pensar junto sobre o negócio.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Tratamos seus dados e os dados dos seus clientes seguindo a LGPD: coletamos só o necessário, guardamos em ambiente com acesso controlado, não vendemos nada pra terceiros e apagamos quando você pedir. Acesso a contas de anúncio é sempre por permissão, nunca por senha compartilhada.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Pode. Não tem fidelidade nem multa. Você avisa, a gente encerra no fim do ciclo já pago e devolve tudo que foi produzido: artes, textos e acessos das campanhas.",
  },
];

export function Faq() {
  return (
    <Section id="faq" dark>
      <SectionTitle eyebrow="Dúvidas" title="Perguntas que todo mundo faz" />
      <Reveal>
        <Accordion type="single" collapsible className="w-full">
          {PERGUNTAS.map((p) => (
            <AccordionItem key={p.q} value={p.q} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold transition-colors hover:text-primary sm:text-lg">
                {p.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {p.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
