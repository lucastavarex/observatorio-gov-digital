import { ContactForm } from '@/components/content/contact-form'
import { CopyButton } from '@/components/shared/copy-button'

export const metadata = { title: 'Contato' }

const contactInfo = [
  {
    label: 'E-mail',
    value: 'mbc@mbc.org.br',
    href: 'mailto:mbc@mbc.org.br',
    copy: true,
  },
  {
    label: 'Endereço',
    value: 'Esplanada dos Ministérios, Bloco C — Brasília/DF, 70046-900',
  },
]

export default function ContatoPage() {
  return (
    <section className="pb-12">
      <div className="dash-x relative px-6 pb-16 pt-28 sm:px-10">
        {/* Linha divisória vertical: altura total, do topo ao fim da seção */}
        <div className="dash-l pointer-events-none absolute inset-y-0 left-1/2 hidden w-px lg:block" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna esquerda: título + informações de contato */}
          <div>
            <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
              Fale conosco
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Para dúvidas, sugestões ou informações sobre o Observatório
              Brasileiro de Governo Digital, entre em contato com a equipe.
            </p>

            <ul className="mt-10 -mx-6 divide-y border-y sm:-mx-10 lg:-mr-8">
              {contactInfo.map(item => (
                <li key={item.label} className="py-5 pl-6 pr-4 sm:pl-10">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-medium text-primary hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-primary">
                        {item.value}
                      </p>
                    )}
                    {item.copy && (
                      <CopyButton value={item.value} label={item.label} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna direita: formulário */}
          <div className="lg:pl-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
