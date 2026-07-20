import Image from 'next/image'
import { Fragment } from 'react'

import { ScrollRevealText } from '@/components/shared/scroll-reveal-text'
import { observatorioLead } from '@/data/site-copy'

export const metadata = { title: 'Sobre' }

const introText =
  'O Observatório Brasileiro de Governo Digital acompanha, de forma permanente e baseada em evidências, a maturidade digital de estados e municípios brasileiros. Reunindo indicadores sobre interoperabilidade, governança e capacidade digital do setor público, o projeto dá transparência à transformação digital do governo e ajuda a identificar gargalos e disseminar boas práticas.'

const ENGD_TERM = 'Estratégia Nacional de Governo Digital'
const ENGD_URL =
  'https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/estrategianacional'

function renderParagraph(text: string) {
  return text.split(ENGD_TERM).map((part, index, parts) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 && (
        <a
          href={ENGD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
        >
          {ENGD_TERM}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      )}
    </Fragment>
  ))
}

const partners = [
  {
    src: '/logos/mgi.png',
    alt: 'Ministério da Gestão e da Inovação em Serviços Públicos',
    width: 2377,
    height: 479,
    size: 'h-12 sm:h-16',
    href: 'https://www.gov.br/gestao/pt-br',
  },
  {
    src: '/logos/mbc.png',
    alt: 'Movimento Brasil Competitivo',
    width: 442,
    height: 150,
    size: 'h-12 sm:h-14',
    href: 'https://www.mbc.org.br/',
  },
  {
    src: '/logos/insper.png',
    alt: 'Insper — Centro de Gestão e Políticas Públicas',
    width: 280,
    height: 52,
    size: 'h-10 sm:h-12',
    href: 'https://www.insper.edu.br/pesquisa-e-conhecimento/centro-de-gestao-e-politicas-publicas/',
  },
]

const sections = [
  {
    title: 'Sobre o Observatório',
    lead: observatorioLead,
    paragraphs: [
      'A plataforma consolida dados provenientes de diversas bases oficiais e os organiza em indicadores comparáveis, alinhados à Estratégia Nacional de Governo Digital (ENGD). Com isso, apoia gestores públicos, pesquisadores, organizações e cidadãos na compreensão dos avanços, desafios e oportunidades da transformação digital no Brasil.',
      'Concebido como um ambiente público de consulta e análise, o Observatório oferece painéis interativos, indicadores, documentação metodológica e séries históricas. Mais do que reunir dados, transforma informações dispersas em conhecimento acessível, promovendo maior transparência e fortalecendo a tomada de decisão baseada em evidências.',
    ],
  },
]

const partnerIntro =
  'O Observatório Brasileiro de Governo Digital é resultado da colaboração entre instituições comprometidas com a inovação, a modernização da administração pública e a produção de conhecimento aplicado.'

const partnerDetails = [
  {
    name: 'Ministério da Gestão e da Inovação em Serviços Públicos (MGI)',
    url: 'https://www.gov.br/gestao/pt-br',
    description:
      'Órgão responsável pela coordenação das políticas de transformação digital do Governo Federal e pela Estratégia Nacional de Governo Digital.',
  },
  {
    name: 'Movimento Brasil Competitivo (MBC)',
    url: 'https://www.mbc.org.br/',
    description:
      'Organização dedicada à promoção da eficiência, inovação e melhoria da gestão pública e da competitividade do país.',
  },
  {
    name: 'Insper – Centro de Gestão e Políticas Públicas (CGPP)',
    url: 'https://www.insper.edu.br/pesquisa-e-conhecimento/centro-de-gestao-e-politicas-publicas/',
    description:
      'Parceiro técnico e acadêmico responsável pelo desenvolvimento metodológico, produção das pesquisas, definição dos indicadores e implementação da plataforma do Observatório. O CGPP atua na formação de líderes públicos e na produção de conhecimento voltado ao desenho, implementação e avaliação de políticas públicas baseadas em evidências.',
  },
]

const historyIntro =
  'O projeto do Observatório Brasileiro de Governo Digital foi concebido a partir da necessidade de criar um mecanismo permanente de monitoramento da transformação digital do Estado brasileiro.'

const historyParagraphs = [
  'Embora o Governo Federal tenha avançado significativamente na implementação de políticas de governo digital, ainda existia a necessidade de consolidar informações provenientes de diferentes bases de dados em um ambiente único, capaz de acompanhar de forma contínua a evolução dos indicadores e apoiar a tomada de decisão.',
  'Em resposta a esse desafio, o Insper, por meio do Centro de Gestão e Políticas Públicas (CGPP), estabeleceu uma parceria com o Ministério da Gestão e da Inovação em Serviços Públicos (MGI) e o Movimento Brasil Competitivo (MBC) para estruturar o Observatório Brasileiro de Governo Digital.',
  'A primeira versão da plataforma reúne indicadores estratégicos organizados conforme os objetivos da Estratégia Nacional de Governo Digital, estabelecendo as bases para um sistema permanente de acompanhamento da maturidade digital do setor público brasileiro e sua evolução ao longo do tempo.',
]

const members: { name: string; linkedin: string | null; role?: string }[] = [
  {
    name: 'Ivar Hartmann',
    linkedin: 'https://www.linkedin.com/in/ivar-alberto-hartmann-44b19110/',
  },
  {
    name: 'Maria Carolina Foss',
    linkedin: 'https://www.linkedin.com/in/maria-carolina-foss-49925320',
  },
  {
    name: 'Suelane Garcia Fontes',
    linkedin: 'https://www.linkedin.com/in/suelane-garcia/',
  },
  {
    name: 'Bruno da Cunha de Oliveira',
    linkedin:
      'https://www.linkedin.com/in/bruno-da-cunha-de-oliveira-5b1820395/',
  },
  {
    name: 'Daniela Matos',
    linkedin: 'https://www.linkedin.com/in/daniela-matos-santos/?locale=pt',
  },
  {
    name: 'Gabriel Croquer',
    linkedin: 'https://www.linkedin.com/in/gabriel-croquer-853657161/',
    role: 'Engenheiro de Dados',
  },
  {
    name: 'Luiza Tuler Veloso',
    linkedin: 'https://www.linkedin.com/in/luiza-tuler-veloso/',
    role: 'Cientista de Dados',
  },
  {
    name: 'Lucas Tavares',
    linkedin: 'https://www.linkedin.com/in/lucastavarex/',
    role: 'Desenvolvedor',
  },
  {
    name: 'Caio Jacintho',
    linkedin: 'https://www.linkedin.com/in/caio-jacintho/',
    role: 'Designer',
  },
]

export default function SobrePage() {
  return (
    <section className="pb-12">
      <div className="px-6 pt-0 pb-16 sm:px-10">
        <ScrollRevealText
          text={introText}
          trackClassName="-mt-16"
          className="max-w-4xl font-medium text-2xl leading-snug tracking-tight sm:text-4xl sm:leading-snug"
        />

        <div className="-mx-6 mt-40 border-y px-6 py-10 sm:-mx-10 sm:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {partners.map(partner => (
              <a
                key={partner.src}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className={`${partner.size} w-auto object-contain`}
                />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            ))}
          </div>
        </div>

        {sections.map((sectionItem, index) => (
          <div
            key={sectionItem.title}
            className={
              index === 0
                ? 'mt-24 grid gap-8 lg:grid-cols-2 lg:gap-16'
                : '-mx-6 mt-24 grid gap-8 border-t px-6 pt-24 sm:-mx-10 sm:px-10 lg:grid-cols-2 lg:gap-16'
            }
          >
            <h2 className="whitespace-pre-line bg-linear-to-br from-primary to-primary-glow bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl">
              {sectionItem.title}
            </h2>
            <div className="space-y-6">
              <p className="text-base font-medium leading-relaxed text-foreground">
                {sectionItem.lead}
              </p>
              {sectionItem.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {renderParagraph(paragraph)}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Parceiros: título à esquerda, introdução + lista de instituições à direita */}
        <div className="-mx-6 mt-24 grid gap-8 border-t px-6 pt-24 sm:-mx-10 sm:px-10 lg:grid-cols-2 lg:gap-16">
          <h2 className="whitespace-pre-line bg-linear-to-br from-primary to-primary-glow bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl">
            Parceiros
          </h2>
          <div className="space-y-6">
            <p className="text-base font-medium leading-relaxed text-foreground">
              {partnerIntro}
            </p>
            <dl className="space-y-6">
              {partnerDetails.map(partner => (
                <div key={partner.name} className="border-t pt-6">
                  <dt className="text-base font-semibold text-foreground">
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:no-underline"
                    >
                      {partner.name}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </dt>
                  <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {partner.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="-mx-6 mt-24 grid grid-cols-2 border-x border-t sm:-mx-10 sm:grid-cols-3 lg:grid-cols-4">
          {members.map(member => (
            <div
              key={member.name}
              className="flex flex-col border-b border-r p-4 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              {/* Placeholder da foto: retângulo cinza (substituir por imagem futuramente) */}
              <div className="aspect-square w-full rounded-md bg-muted" />
              <div className="mt-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    {member.role ?? 'Consultor'}
                  </p>
                </div>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex shrink-0 transition-opacity hover:opacity-70"
                  >
                    <span className="sr-only">
                      Perfil de {member.name} no LinkedIn (abre em nova aba)
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-5 text-primary"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="3"
                        fill="#fff"
                      />
                      <path
                        fill="currentColor"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Histórico: título à esquerda, texto à direita (mesmo layout da seção de abertura) */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="whitespace-pre-line bg-linear-to-br from-primary to-primary-glow bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl">
            Histórico
          </h2>
          <div className="space-y-6">
            <p className="text-base font-medium leading-relaxed text-foreground">
              {historyIntro}
            </p>
            {historyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {renderParagraph(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
