import { ContactForm } from '@/components/content/contact-form'
import { MagnetLines } from '@/components/ui/magnet-lines'

export const metadata = { title: 'Contato' }

export default function ContatoPage() {
  return (
    <section className="pb-12">
      <div className="relative px-6 pt-28 pb-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl">
              Fale conosco
            </h1>
            <p className="mt-0 max-w-md text-base text-muted-foreground leading-relaxed">
              Para dúvidas, sugestões ou informações sobre o Observatório
              Brasileiro de Governo Digital, entre em contato com a equipe.
            </p>

            <div className="relative mt-10 min-h-28 flex-1 overflow-hidden">
              <MagnetLines
                rows={12}
                columns={22}
                lineColor="var(--muted-foreground)"
                lineWidth="1px"
                lineHeight="11px"
                className="pointer-events-none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.55,
                }}
              />
            </div>
          </div>

          <div className="lg:pl-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
