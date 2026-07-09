export type RankingEntry = {
  name: string
  score: number
  highlight?: boolean
}

export type RankingLevel = {
  key: 'federal' | 'estadual' | 'municipal'
  label: string
  entries: RankingEntry[]
}

// Valores ilustrativos (mock) — substituir pelos dados reais do observatório.
export const rankingLevels: RankingLevel[] = [
  {
    key: 'federal',
    label: 'Federal',
    // Comparação da nota do Brasil em relação a outros países.
    entries: [
      { name: 'Coreia do Sul', score: 92.1 },
      { name: 'Dinamarca', score: 90.8 },
      { name: 'Reino Unido', score: 89.5 },
      { name: 'Estônia', score: 88.7 },
      { name: 'Nova Zelândia', score: 87.2 },
      { name: 'Austrália', score: 85.9 },
      { name: 'Japão', score: 84.3 },
      { name: 'Singapura', score: 83.6 },
      { name: 'França', score: 81.4 },
      { name: 'Canadá', score: 80.2 },
      { name: 'Brasil', score: 78.9, highlight: true },
      { name: 'Espanha', score: 77.5 },
      { name: 'Portugal', score: 76.1 },
      { name: 'Itália', score: 74.8 },
      { name: 'Chile', score: 73.2 },
      { name: 'México', score: 71.0 },
      { name: 'Argentina', score: 69.4 },
      { name: 'Índia', score: 67.1 },
      { name: 'África do Sul', score: 64.5 },
      { name: 'Turquia', score: 62.8 },
      { name: 'Indonésia', score: 60.3 },
    ],
  },
  {
    key: 'estadual',
    label: 'Estadual',
    entries: [
      { name: 'São Paulo', score: 84.6 },
      { name: 'Distrito Federal', score: 82.1 },
      { name: 'Paraná', score: 80.7 },
      { name: 'Santa Catarina', score: 79.9 },
      { name: 'Rio Grande do Sul', score: 78.3 },
      { name: 'Espírito Santo', score: 77.0 },
      { name: 'Minas Gerais', score: 76.2 },
      { name: 'Rio de Janeiro', score: 74.8 },
      { name: 'Goiás', score: 73.1 },
      { name: 'Ceará', score: 72.4 },
      { name: 'Pernambuco', score: 70.9 },
      { name: 'Bahia', score: 69.5 },
      { name: 'Mato Grosso do Sul', score: 68.7 },
      { name: 'Mato Grosso', score: 67.2 },
      { name: 'Rio Grande do Norte', score: 65.8 },
      { name: 'Paraíba', score: 64.3 },
      { name: 'Sergipe', score: 63.1 },
      { name: 'Tocantins', score: 61.9 },
      { name: 'Alagoas', score: 60.4 },
      { name: 'Rondônia', score: 59.2 },
      { name: 'Piauí', score: 58.0 },
      { name: 'Amazonas', score: 56.7 },
      { name: 'Pará', score: 55.3 },
      { name: 'Maranhão', score: 53.8 },
      { name: 'Acre', score: 52.1 },
      { name: 'Amapá', score: 50.6 },
      { name: 'Roraima', score: 49.2 },
    ],
  },
  {
    key: 'municipal',
    label: 'Municipal',
    entries: [
      { name: 'São Paulo', score: 83.9 },
      { name: 'Curitiba', score: 82.5 },
      { name: 'Florianópolis', score: 81.0 },
      { name: 'Brasília', score: 80.2 },
      { name: 'Belo Horizonte', score: 78.6 },
      { name: 'Vitória', score: 77.1 },
      { name: 'Porto Alegre', score: 75.9 },
      { name: 'Rio de Janeiro', score: 74.5 },
      { name: 'Goiânia', score: 72.8 },
      { name: 'Recife', score: 71.3 },
      { name: 'Fortaleza', score: 70.0 },
      { name: 'Salvador', score: 68.4 },
      { name: 'Campo Grande', score: 67.1 },
      { name: 'Cuiabá', score: 65.6 },
      { name: 'Natal', score: 64.2 },
      { name: 'João Pessoa', score: 62.9 },
      { name: 'Aracaju', score: 61.3 },
      { name: 'Palmas', score: 60.1 },
      { name: 'Maceió', score: 58.7 },
      { name: 'Porto Velho', score: 57.2 },
      { name: 'Teresina', score: 55.8 },
      { name: 'Manaus', score: 54.3 },
      { name: 'Belém', score: 52.9 },
      { name: 'São Luís', score: 51.4 },
      { name: 'Rio Branco', score: 49.8 },
      { name: 'Macapá', score: 48.3 },
      { name: 'Boa Vista', score: 47.0 },
    ],
  },
]
