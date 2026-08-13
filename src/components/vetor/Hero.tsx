import { VetorLogo, WHATSAPP_URL } from "./shared";
import { WhatsAppMock } from "./WhatsAppMock";

export function Hero() {
  return (
    <header className="section-dark px-5 pt-6 pb-16 sm:px-8 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <nav className="flex items-center justify-between">
          <VetorLogo />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center rounded-xl border border-border px-4 text-sm font-semibold sm:inline-flex"
          >
            Falar no WhatsApp
          </a>
        </nav>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              Sua agência atual demora 3 dias para responder. A sua nova agência{" "}
              <span className="text-primary">responde em 3 segundos</span> — e nunca dorme.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              O Vetor é um time de agentes de inteligência artificial — tráfego pago, design,
              social media e estratégia — atendendo você pelo WhatsApp, todos os dias, a qualquer
              hora. Tudo supervisionado por especialistas que entendem de negócio pequeno.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#planos"
                className="hover-pop inline-flex h-13 items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow"
              >
                Quero conhecer o Vetor
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="hover-pop inline-flex items-center justify-center rounded-xl border border-border px-7 py-3.5 text-base font-semibold transition-colors hover:bg-accent"
              >
                Falar no WhatsApp
              </a>
            </div>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <li>✓ Sem fidelidade</li>
              <li>✓ Setup em minutos</li>
              <li>✓ Cancele quando quiser</li>
            </ul>
          </div>

          <WhatsAppMock />
        </div>
      </div>
    </header>
  );
}
