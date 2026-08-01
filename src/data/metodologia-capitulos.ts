export type MetodologiaCapitulo = {
  slug: string
  file: string
  title: string
  order: number
}

/** Capítulos e anexos do relatório metodológico, na ordem de publicação. */
export const metodologiaCapitulos: MetodologiaCapitulo[] = [
  {
    slug: 'cap01-introducao',
    file: 'cap01_introducao',
    title: '1. Introdução',
    order: 1,
  },
  {
    slug: 'cap02-revisao-literatura',
    file: 'cap02_revisao_literatura',
    title: '2. Revisão de Literatura',
    order: 2,
  },
  {
    slug: 'cap03-metodologia',
    file: 'cap03_metodologia',
    title: '3. Metodologia',
    order: 3,
  },
  {
    slug: 'cap04-obj01-governanca',
    file: 'cap04_obj01_governanca',
    title: '4. Objetivo 1: Governança do Governo Digital',
    order: 4,
  },
  {
    slug: 'cap05-obj02-qualidade',
    file: 'cap05_obj02_qualidade',
    title: '5. Objetivo 2: Qualidade dos Serviços Digitais',
    order: 5,
  },
  {
    slug: 'cap06-obj03-identificacao-unica',
    file: 'cap06_obj03_identificacao_unica',
    title: '6. Objetivo 3: Identificação Única',
    order: 6,
  },
  {
    slug: 'cap07-obj04-seguranca-lgpd',
    file: 'cap07_obj04_seguranca_lgpd',
    title: '7. Objetivo 4: Segurança e LGPD',
    order: 7,
  },
  {
    slug: 'cap08-obj05-dados-interoperabilidade',
    file: 'cap08_obj05_dados_interoperabilidade',
    title: '8. Objetivo 5: Dados e Interoperabilidade',
    order: 8,
  },
  {
    slug: 'cap09-obj06-infraestrutura',
    file: 'cap09_obj06_infraestrutura',
    title: '9. Objetivo 6: Infraestrutura',
    order: 9,
  },
  {
    slug: 'cap10-obj07-inovacao',
    file: 'cap10_obj07_inovacao',
    title: '10. Objetivo 7: Inovação e Tecnologias Emergentes',
    order: 10,
  },
  {
    slug: 'cap11-obj08-eficiencia',
    file: 'cap11_obj08_eficiencia',
    title: '11. Objetivo 8: Eficiência e Processos',
    order: 11,
  },
  {
    slug: 'cap12-obj09-transparencia',
    file: 'cap12_obj09_transparencia',
    title: '12. Objetivo 9: Transparência e Participação',
    order: 12,
  },
  {
    slug: 'cap13-obj10-competencias',
    file: 'cap13_obj10_competencias',
    title: '13. Objetivo 10: Competências em Governo Digital',
    order: 13,
  },
  {
    slug: 'anexo-a-variaveis-excluidas',
    file: 'anexo_a_variaveis_excluidas',
    title: 'Anexo A — Variáveis Excluídas',
    order: 14,
  },
  {
    slug: 'anexo-b-lacunas-recomendacoes',
    file: 'anexo_b_lacunas_recomendacoes',
    title: 'Anexo B — Lacunas em relação às recomendações da ENGD',
    order: 15,
  },
  {
    slug: 'anexo-c-atas-entrevistas',
    file: 'anexo_c_atas_entrevistas',
    title: 'Anexo C — Atas de entrevistas',
    order: 16,
  },
  {
    slug: 'referencias-bibliograficas',
    file: 'referencias_bibliograficas',
    title: 'Referências bibliográficas',
    order: 17,
  },
]

export function getMetodologiaCapitulo(slug: string) {
  return metodologiaCapitulos.find(cap => cap.slug === slug)
}

export function getMetodologiaCapituloNav(slug: string) {
  const index = metodologiaCapitulos.findIndex(cap => cap.slug === slug)
  if (index === -1) return null
  return {
    current: metodologiaCapitulos[index],
    prev: index > 0 ? metodologiaCapitulos[index - 1] : null,
    next:
      index < metodologiaCapitulos.length - 1
        ? metodologiaCapitulos[index + 1]
        : null,
  }
}

export function metodologiaCapituloHref(slug: string) {
  return `/metodologia/${slug}`
}
