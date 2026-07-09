export interface FaqItem {
  pergunta: string
  resposta: string
}

export const faqItems: FaqItem[] = [
  {
    pergunta: 'O que é o Observatório Brasileiro de Governo Digital?',
    resposta:
      'É uma iniciativa que monitora e compara a maturidade digital dos governos federal, estaduais e municipais brasileiros, organizada segundo os dez objetivos da Estratégia Nacional de Governo Digital (ENGD).',
  },
  {
    pergunta: 'Como o índice de maturidade é calculado?',
    resposta:
      'Cada ente recebe uma nota de 0 a 100 em cada objetivo, a partir de variáveis extraídas de fontes públicas (IBGE, CGU, ABEP-TIC, entre outras). O índice geral é a média dos objetivos com cobertura de dados.',
  },
  {
    pergunta: 'De onde vêm os dados?',
    resposta:
      'Os indicadores são construídos a partir de bases oficiais e verificáveis. Em cada variável é possível ver a fonte original e baixar os dados que sustentam a nota.',
  },
  {
    pergunta: 'Posso comparar diferentes entes?',
    resposta:
      'Sim. Na página de Indicadores você seleciona até três entes e visualiza os perfis lado a lado no radar; no Ranking, é possível explorar cada ente do nível até a variável.',
  },
  {
    pergunta: 'Os dados são atualizados?',
    resposta:
      'O índice acompanha a evolução ao longo do tempo, sendo revisado a cada nova edição das fontes de dados utilizadas.',
  },
]
