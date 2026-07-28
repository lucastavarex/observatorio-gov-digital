/**
 * Mapeamento mock tag → variáveis ilustrativas.
 * Substituir quando Gabriel fornecer indicador_id[] por tag.
 */
export type VariavelTematicaMock = {
  slug: string
  nome: string
  fonte: string
}

const V = (
  slug: string,
  nome: string,
  fonte = 'Fonte pública (mock)'
): VariavelTematicaMock => ({ slug, nome, fonte })

export const variaveisPorTematica: Record<string, VariavelTematicaMock[]> = {
  'pagamentos-digitais': [
    V('pix-governo', 'Aceite de PIX em serviços públicos'),
    V('carteira-digital', 'Carteira digital de pagamentos'),
    V('conciliacao-automatica', 'Conciliação automática de receitas'),
  ],
  'cidades-inteligentes': [
    V('iot-urbano', 'Sensores / IoT em serviços urbanos'),
    V('centro-operacoes', 'Centro de operações urbanas'),
    V('dados-urbanos-abertos', 'Publicação de dados urbanos'),
  ],
  conectividade: [
    V('banda-larga-orgaos', 'Banda larga em órgãos públicos'),
    V('wifi-publico', 'Wi-Fi público institucional'),
    V('redundancia-rede', 'Redundância de conectividade'),
  ],
  'identidade-digital': [
    V('login-unico', 'Login único em serviços digitais'),
    V('integracao-govbr', 'Integração com autenticação Gov.br'),
  ],
  'dados-abertos': [
    V('portal-dados', 'Portal de dados abertos ativo'),
    V('catalogo-datasets', 'Catálogo de datasets atualizado'),
    V('api-publica', 'APIs públicas documentadas'),
  ],
  'inteligencia-artificial': [
    V('politica-ia', 'Política ou diretrizes de IA'),
    V('casos-uso-ia', 'Casos de uso de IA em produção'),
  ],
  ciberseguranca: [
    V('politica-seguranca', 'Política de segurança da informação'),
    V('csirt', 'Estrutura de resposta a incidentes'),
    V('lgpd-dpo', 'Encarregado / estrutura LGPD'),
  ],
  interoperabilidade: [
    V('barramento', 'Barramento / plataforma de interoperabilidade'),
    V('padroes-integracao', 'Padrões de integração publicados'),
  ],
  'servicos-moveis': [
    V('app-servicos', 'Aplicativo de serviços ao cidadão'),
    V('responsivo', 'Serviços responsivos / mobile-first'),
  ],
  'nuvem-governamental': [
    V('uso-nuvem', 'Uso de nuvem em cargas críticas'),
    V('politica-nuvem', 'Política de nuvem governamental'),
  ],
  'atendimento-ao-cidadao': [
    V('ouvidoria-digital', 'Ouvidoria / atendimento digital'),
    V('tempo-resposta', 'Metas de tempo de resposta publicadas'),
  ],
  transparencia: [
    V('portal-transparencia', 'Portal da transparência'),
    V('diario-oficial', 'Diário oficial digital acessível'),
  ],
  'participacao-social': [
    V('consulta-publica', 'Consultas públicas digitais'),
    V('orcamento-participativo', 'Canais de participação orçamentária'),
  ],
  'capacitacao-digital': [
    V('trilhas-capacitacao', 'Trilhas de capacitação digital'),
    V('certificacoes', 'Programa de certificações internas'),
  ],
  'automacao-de-processos': [
    V('rpa', 'Automação de processos administrativos'),
    V('workflow', 'Workflow digital de processos'),
  ],
  'assinatura-eletronica': [
    V('assinatura-icp', 'Assinatura eletrônica / ICP-Brasil'),
    V('processo-eletronico', 'Processo administrativo eletrônico'),
  ],
  'inclusao-digital': [
    V('acessibilidade', 'Conformidade de acessibilidade digital'),
    V('pontos-inclusao', 'Pontos de inclusão digital'),
  ],
  'governanca-de-dados': [
    V('comite-dados', 'Comitê / governança de dados'),
    V('catalogo-interno', 'Catálogo interno de dados'),
  ],
  'infraestrutura-de-ti': [
    V('datacenter', 'Infraestrutura de TI / datacenter'),
    V('continuidade', 'Plano de continuidade de TI'),
  ],
  'compras-publicas': [
    V('compras-digitais', 'Compras públicas digitais'),
    V('catalogo-compras', 'Catálogo eletrônico de compras'),
  ],
}
