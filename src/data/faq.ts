export interface FaqItem {
  pergunta: string
  resposta: string
}

export const faqItems: FaqItem[] = [
  {
    pergunta: 'O que é o Observatório Brasileiro de Governo Digital?',
    resposta:
      'É uma iniciativa que monitora e compara o desenvolvimento digital dos governos federal, estaduais e municipais brasileiros, organizada segundo os dez objetivos da Estratégia Nacional de Governo Digital (ENGD).',
  },
  {
    pergunta: 'Como o Índice de Desenvolvimento Digital é calculado?',
    resposta:
      'Cada ente recebe uma nota de 0 a 100 em cada objetivo da ENGD, a partir de variáveis extraídas de fontes públicas (IBGE, CGU, ABEP-TIC, entre outras). A plataforma não calcula nem exibe uma média geral entre todos os objetivos — os escores são sempre apresentados diante de um objetivo (ou de um recorte temático) específico.',
  },
  {
    pergunta: 'De onde vêm os dados?',
    resposta:
      'Os indicadores são construídos a partir de bases oficiais e verificáveis. Em cada objetivo é possível ver as variáveis que o compõem, abrir o site da fonte e baixar o CSV com os valores normalizados usados no Observatório (recorte do índice, não o microdado bruto completo).',
  },
  {
    pergunta: 'O que é a média do nível no radar?',
    resposta:
      'Para cada objetivo, é a média das notas dos entes daquele nível (por exemplo, todos os estados) que têm dado. Serve só de referência de comparação — não é um ranking e não mistura objetivos diferentes.',
  },
  {
    pergunta: 'Posso comparar diferentes entes?',
    resposta:
      'Sim. Na página de Indicadores você seleciona até cinco entes e visualiza os perfis lado a lado no radar; no Ranking, é possível explorar cada ente do nível até o objetivo e ver as variáveis associadas.',
  },
  {
    pergunta: 'Os dados são atualizados?',
    resposta:
      'O índice acompanha a evolução ao longo do tempo, sendo revisado a cada nova edição das fontes de dados utilizadas.',
  },
]
